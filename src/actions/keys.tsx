"use server";

import { generate } from "referral-codes";
import { ActionResponse, createActionResponse } from "./helpers";
import { Key } from "@prisma/client";
import prisma from "@/lib/prisma";

export const createKey = async (): Promise<ActionResponse<Key>> => {
  try {
    const code = generate({ length: 8 })[0].toUpperCase();

    const key = await prisma.key.create({
      data: {
        code,
      },
    });

    return createActionResponse(key);
  } catch (error: unknown) {
    if (error instanceof Error)
      return createActionResponse(null, error.message);

    return createActionResponse(null);
  }
};
