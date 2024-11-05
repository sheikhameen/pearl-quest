"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { Set } from "@prisma/client";
import { newSetWithQuestionsSchema } from "@/lib/zodSchemas";
import { ActionResponse, createActionResponse } from "./helpers";

export const createSet = async (
  data: z.infer<typeof newSetWithQuestionsSchema>
): Promise<ActionResponse<Set>> => {
  try {
    const key = await prisma.key.findFirst({
      where: {
        code: data.key.toUpperCase(),
      },
    });

    if (!key) throw new Error("Invalid key");

    const newSet = await prisma.set.create({
      data: {
        title: data.title,
        description: data.description,
        questions: {
          create: data.questions.map((question) => ({
            text: question.text,
            difficulty: question.difficulty,
            answers: {
              create: question.answers.map((answer) => ({
                text: answer.text,
                isCorrect: answer.isCorrect,
              })),
            },
          })),
        },
      },
    });

    return createActionResponse(newSet);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return createActionResponse(null, error.message);
    }
    return createActionResponse(null);
  }
};
