import { Prisma } from "@prisma/client";

export type SetWithQuestionsCount = Prisma.SetGetPayload<{
  include: {
    _count: {
      select: {
        questions: true;
      };
    };
  };
}>;
