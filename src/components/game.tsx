"use client";
import { Answer, Prisma } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

type SetWithQuestionAndAnswers = Prisma.SetGetPayload<{
  include: { questions: { include: { answers: true } } };
}>;

interface GameProps {
  set: SetWithQuestionAndAnswers;
}

const timeouts = {
  EASY: 10,
  MEDIUM: 20,
  HARD: 30,
} as const;

const Game = ({ set }: GameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < set.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
  }, [currentQuestionIndex, set.questions.length]);

  const handleAnswer = (answer: Answer) => {
    if (answer.isCorrect) {
      const points =
        currentQuestion.difficulty === "EASY"
          ? 1
          : currentQuestion.difficulty === "MEDIUM"
          ? 2
          : 3;
      setScore((prevScore) => prevScore + points);
    }
    handleNextQuestion();
  };

  const currentQuestion = set.questions[currentQuestionIndex];

  useEffect(() => {
    if (gameOver) return;
    const difficulty = currentQuestion.difficulty;
    const duration = timeouts[difficulty];
    setTimeLeft(duration);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleNextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, gameOver, currentQuestion, handleNextQuestion]);

  if (gameOver) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Game Over!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">Final Score: {score}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{set.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {set.questions.length}
        </p>
      </CardHeader>
      <CardContent>
        <Progress
          value={(timeLeft / timeouts[currentQuestion.difficulty]) * 100}
          className="mb-4"
        />
        <p className="mb-4 text-lg font-medium">{currentQuestion.text}</p>
        <div className="grid gap-2">
          {currentQuestion.answers.map((answer) => (
            <Button
              key={answer.id}
              onClick={() => handleAnswer(answer)}
              variant="outline"
              className="justify-start"
            >
              {answer.text}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-lg font-semibold">Score: {score}</p>
      </CardFooter>
    </Card>
  );
};

export default Game;
