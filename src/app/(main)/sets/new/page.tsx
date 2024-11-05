"use client";

import { z, ZodError } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { $Enums, Prisma } from "@prisma/client";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { createSet } from "@/actions/sets";
import { useRouter } from "next/navigation";
import {
  newSetSchema,
  newSetWithQuestionsSchema,
  questionSchema,
} from "@/lib/zodSchemas";

type QuestionWithAnswers = Prisma.QuestionGetPayload<{
  include: {
    answers: {
      select: {
        text: true;
        isCorrect: true;
      };
    };
  };
  omit: {
    setId: true;
  };
}>;

type AnswersMCQType = "answer-1" | "answer-2" | "answer-3" | "answer-4";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionAnswer1, setNewQuestionAnswer1] = useState("");
  const [newQuestionAnswer2, setNewQuestionAnswer2] = useState("");
  const [newQuestionAnswer3, setNewQuestionAnswer3] = useState("");
  const [newQuestionAnswer4, setNewQuestionAnswer4] = useState("");
  const [newQuestionCorrectAnswer, setNewQuestionCorrectAnswer] =
    useState<AnswersMCQType>("answer-1");
  const [newQuestionDifficulty, setNewQuestionDifficulty] =
    useState<$Enums.Difficulty>("EASY");
  const difficulties: $Enums.Difficulty[] = ["EASY", "MEDIUM", "HARD"];

  const form = useForm<z.infer<typeof newSetSchema>>({
    resolver: zodResolver(newSetSchema),
    defaultValues: {
      key: "",
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newSetSchema>) => {
    const toastId = toast.loading("Creating a set...");
    setLoading(true);
    setFormError(null);

    const valuesWithQuestions: z.infer<typeof newSetWithQuestionsSchema> = {
      ...values,
      questions,
    };
    const response = await createSet(valuesWithQuestions);

    if (response.ok) {
      toast.success("Successfully added set!", { id: toastId });
      router.push("/sets");
      return;
    }

    toast.error(response.error.message, { id: toastId });
    setLoading(false);
    setFormError(response.error.message);
  };

  const resetNewQuestionForm = () => {
    setNewQuestionText("");
    setNewQuestionAnswer1("");
    setNewQuestionAnswer2("");
    setNewQuestionAnswer3("");
    setNewQuestionAnswer4("");
    setNewQuestionCorrectAnswer("answer-1");
    setNewQuestionDifficulty("EASY");
  };

  const handleAddNewQuestion = async () => {
    const existingQuestion = questions.find((q) => q.text === newQuestionText);

    if (existingQuestion) {
      toast.error("You cannot have the same question again.");
      return;
    }

    try {
      const question = {
        id: questions.length.toString(),
        text: newQuestionText,
        difficulty: newQuestionDifficulty,
        answers: [
          {
            text: newQuestionAnswer1,
            isCorrect: newQuestionCorrectAnswer === "answer-1",
          },
          {
            text: newQuestionAnswer2,
            isCorrect: newQuestionCorrectAnswer === "answer-2",
          },
          {
            text: newQuestionAnswer3,
            isCorrect: newQuestionCorrectAnswer === "answer-3",
          },
          {
            text: newQuestionAnswer4,
            isCorrect: newQuestionCorrectAnswer === "answer-4",
          },
        ],
      };

      const parsedQuestion = await questionSchema.parseAsync(question);

      setQuestions([...questions, parsedQuestion]);

      resetNewQuestionForm();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Set</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormDescription>
                    You need a valid key to create question sets.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Your key here..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Set title here..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Set description here..."
                      className="resize-none"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Card className="p-3 pt-2 bg-muted space-y-1">
              <Label>Added Questions</Label>
              {questions.length === 0 && (
                <CardDescription className="text-xs">
                  Add questions below. Added questions appear here.
                </CardDescription>
              )}
              {questions.map((question) => (
                <Card key={question.id} className="py-2 px-3 shadow-none">
                  <CardHeader className="p-0 space-y-0 flex-row gap-2 items-start justify-between">
                    <div className="space-y-1 overflow-auto">
                      <div
                        className={cn(
                          "text-xs font-semibold text-white px-1 rounded w-max",
                          question.difficulty === "EASY"
                            ? "bg-green-600"
                            : question.difficulty === "MEDIUM"
                            ? "bg-yellow-500"
                            : "bg-destructive"
                        )}
                      >
                        {question.difficulty}
                      </div>
                      <CardTitle className="text-md leading-tight">
                        <span className="text-muted-foreground/50 mr-1.5">
                          {parseInt(question.id) + 1}.
                        </span>
                        {question.text}
                      </CardTitle>
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      type="button"
                      className="w-8 h-8 p-2"
                      onClick={() => {
                        const filteredQuestions = questions.filter(
                          (q) => q.id !== question.id
                        );
                        let idCounter = 0;
                        const newQuestions = filteredQuestions.map((q) => ({
                          ...q,
                          id: (idCounter++).toString(),
                        }));
                        setQuestions(newQuestions);
                      }}
                    >
                      <Trash />
                    </Button>
                  </CardHeader>

                  <CardContent className="p-0 pt-2 text-xs font-semibold grid grid-cols-2 gap-1">
                    {question.answers.map((answer, index) => (
                      <div
                        key={index}
                        className={cn(
                          "border rounded-lg py-1 px-3",
                          answer.isCorrect && "bg-green-300"
                        )}
                      >
                        {answer.text}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </Card>
            <Card className="space-y-4 p-3 pt-2 bg-muted">
              <Label>Add a new question</Label>
              <Textarea
                className="resize-none"
                placeholder="Your question here..."
                disabled={loading}
                value={newQuestionText}
                onChange={({ target }) => setNewQuestionText(target.value)}
              />
              <RadioGroup
                className="gap-1"
                value={newQuestionCorrectAnswer}
                disabled={loading}
                onValueChange={(value: AnswersMCQType) =>
                  setNewQuestionCorrectAnswer(value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="answer-1" id="answer-1" />
                  <Label htmlFor="answer-1" className="w-full">
                    <Input
                      placeholder="Answer #1"
                      disabled={loading}
                      value={newQuestionAnswer1}
                      onChange={({ target }) =>
                        setNewQuestionAnswer1(target.value)
                      }
                    />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="answer-2" id="answer-2" />
                  <Label htmlFor="answer-2" className="w-full">
                    <Input
                      placeholder="Answer #2"
                      disabled={loading}
                      value={newQuestionAnswer2}
                      onChange={({ target }) =>
                        setNewQuestionAnswer2(target.value)
                      }
                    />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="answer-3" id="answer-3" />
                  <Label htmlFor="answer-3" className="w-full">
                    <Input
                      placeholder="Answer #3"
                      disabled={loading}
                      value={newQuestionAnswer3}
                      onChange={({ target }) =>
                        setNewQuestionAnswer3(target.value)
                      }
                    />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="answer-4" id="answer-4" />
                  <Label htmlFor="answer-4" className="w-full">
                    <Input
                      placeholder="Answer #4"
                      disabled={loading}
                      value={newQuestionAnswer4}
                      onChange={({ target }) =>
                        setNewQuestionAnswer4(target.value)
                      }
                    />
                  </Label>
                </div>
              </RadioGroup>

              <RadioGroup
                disabled={loading}
                value={newQuestionDifficulty}
                onValueChange={(value: $Enums.Difficulty) => {
                  setNewQuestionDifficulty(value);
                }}
              >
                <Label>Difficulty:</Label>
                <div className="flex gap-2 justify-between flex-wrap">
                  {difficulties.map((difficulty) => (
                    <div
                      key={difficulty}
                      className="flex items-center space-x-1"
                    >
                      <RadioGroupItem value={difficulty} id={difficulty} />
                      <Label
                        htmlFor={difficulty}
                        className={cn(
                          difficulty === "EASY"
                            ? "bg-green-600"
                            : difficulty === "MEDIUM"
                            ? "bg-yellow-500"
                            : "bg-destructive",
                          "px-2 py-1 rounded text-white cursor-pointer"
                        )}
                      >
                        {difficulty}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={loading}
                onClick={handleAddNewQuestion}
              >
                <PlusCircle /> Add new question
              </Button>
              <p className="text-xs text-muted-foreground">
                Don&apos;t forget to click the button to add the question!
              </p>
            </Card>
            {formError && (
              <p className="text-xs bg-red-500 text-white py-1 px-2 rounded">
                {formError}
              </p>
            )}
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
