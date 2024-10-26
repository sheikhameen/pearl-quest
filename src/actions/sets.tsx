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
    const newSet = await prisma.set.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });

    data.questions.forEach(async (question) => {
      const newQuestion = await prisma.question.create({
        data: {
          setId: newSet.id,
          text: question.text,
          difficulty: question.difficulty,
        },
      });

      question.answers.forEach(async (answer) => {
        await prisma.answer.create({
          data: {
            text: answer.text,
            isCorrect: answer.isCorrect,
            questionId: newQuestion.id,
          },
        });
      });
    });

    return createActionResponse(newSet);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return createActionResponse(null, error.message);
    }
    return createActionResponse(null);
  }
};
