"use client";

import { z } from "zod";
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
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { $Enums, Prisma } from "@prisma/client";

type QuestionWithAnswers = Prisma.QuestionGetPayload<{
  include: {
    answers: {
      select: {
        text: true;
      };
    };
  };
  omit: {
    setId: true;
  };
}>;

const formSchema = z.object({
  key: z
    .string()
    .min(3, "Key must have at least 3 characters")
    .max(20, "Key must have at most 20 characters"),
  title: z
    .string()
    .min(3, "Title must have at least 3 characters")
    .max(64, "Title must have at most 64 characters"),
  description: z
    .string()
    .min(3, "Description must have at least 3 characters")
    .max(256, "Description must have at most 256 characters"),
});

const Page = () => {
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionAnswer1, setNewQuestionAnswer1] = useState("");
  const [newQuestionAnswer2, setNewQuestionAnswer2] = useState("");
  const [newQuestionAnswer3, setNewQuestionAnswer3] = useState("");
  const [newQuestionAnswer4, setNewQuestionAnswer4] = useState("");
  const [newQuestionDifficulty, setNewQuestionDifficulty] =
    useState<$Enums.Difficulty>("EASY");
  const difficulties: $Enums.Difficulty[] = ["EASY", "MEDIUM", "HARD"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: "",
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleAddNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length.toString(),
        text: newQuestionText,
        difficulty: newQuestionDifficulty,
        answers: [
          { text: newQuestionAnswer1 },
          { text: newQuestionAnswer2 },
          { text: newQuestionAnswer3 },
          { text: newQuestionAnswer4 },
        ],
      },
    ]);
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
                    <Input placeholder="You key here..." {...field} />
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
                    <Input placeholder="Set title here..." {...field} />
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
                    <Input placeholder="Set description here..." {...field} />
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
                  <CardTitle className="text-lg leading-tight">
                    <span className="text-muted-foreground/50">
                      {parseInt(question.id) + 1}.
                    </span>{" "}
                    {question.text}
                  </CardTitle>
                </Card>
              ))}
            </Card>
            <Card className="space-y-4 p-3 pt-2 bg-muted">
              <Label>Add a new question</Label>
              <Textarea
                className="resize-none"
                placeholder="Your question here..."
                value={newQuestionText}
                onChange={({ target }) => setNewQuestionText(target.value)}
              />
              <RadioGroup defaultValue="answer-1" className="gap-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="answer-1" id="answer-1" />
                  <Label htmlFor="answer-1" className="w-full">
                    <Input
                      placeholder="Answer #1"
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
                      value={newQuestionAnswer4}
                      onChange={({ target }) =>
                        setNewQuestionAnswer4(target.value)
                      }
                    />
                  </Label>
                </div>
              </RadioGroup>

              <RadioGroup
                value={newQuestionDifficulty}
                onValueChange={(value: $Enums.Difficulty) => {
                  setNewQuestionDifficulty(value);
                }}
              >
                <Label>Difficulty:</Label>
                <div className="flex gap-2 justify-between">
                  {difficulties.map((difficulty) => (
                    <div
                      key={difficulty}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={difficulty} id={difficulty} />
                      <Label htmlFor={difficulty}>{difficulty}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleAddNewQuestion}
              >
                <PlusCircle /> Add new question
              </Button>
            </Card>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
