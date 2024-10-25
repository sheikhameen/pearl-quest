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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [newQuestionAnswer1] = useState("");
  const [newQuestionAnswer2] = useState("");
  const [newQuestionAnswer3] = useState("");
  const [newQuestionAnswer4] = useState("");
  const [newQuestionDifficulty] = useState<$Enums.Difficulty>("EASY");

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
            <div className="space-y-2">
              <div className="text-destructive font-bold">TO-DO</div>
              {questions.map((question) => (
                <Card key={question.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      <span className="text-muted-foreground/50">
                        {parseInt(question.id) + 1}.
                      </span>{" "}
                      {question.text}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="space-y-2">
              <div className="text-destructive font-bold">TO-DO</div>
              <Textarea
                className="resize-none"
                value={newQuestionText}
                onChange={({ target }) => setNewQuestionText(target.value)}
              />
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one" className="w-full">
                    <Input placeholder="Answer #1" />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two" className="w-full">
                    <Input placeholder="Answer #2" />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-three" />
                  <Label htmlFor="option-three" className="w-full">
                    <Input placeholder="Answer #3" />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-four" id="option-four" />
                  <Label htmlFor="option-four" className="w-full">
                    <Input placeholder="Answer #4" />
                  </Label>
                </div>
              </RadioGroup>
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={handleAddNewQuestion}
              >
                <PlusCircle /> Add new question
              </Button>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
