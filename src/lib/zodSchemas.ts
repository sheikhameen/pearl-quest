import { z } from "zod";

export const answerSchema = z.object({
  text: z
    .string()
    .min(1, "Answer cannot be empty.")
    .max(32, "Answer cannot be longer than 32 characters"),
  isCorrect: z.boolean(),
});
export const questionSchema = z.object({
  id: z.string(),
  text: z
    .string()
    .min(1, "Question cannot be empty.")
    .max(128, "Question cannot be longer than 128 characters"),
  answers: answerSchema.array(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
    message: "Invalid value. Allowed values: EASY / MEDIUM / HARD",
  }),
});

const newSetShape = {
  key: z.string().length(8, "Key must have exactly 8 characters"),
  title: z
    .string()
    .min(3, "Title must have at least 3 characters")
    .max(64, "Title must have at most 64 characters"),
  description: z
    .string()
    .min(3, "Description must have at least 3 characters")
    .max(256, "Description must have at most 256 characters"),
};
export const newSetSchema = z.object(newSetShape);
export const newSetWithQuestionsSchema = z.object({
  ...newSetShape,
  questions: questionSchema.array(),
});
