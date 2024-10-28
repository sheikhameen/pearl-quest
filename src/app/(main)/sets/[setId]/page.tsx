import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ setId: string }> }) => {
  const { setId } = await params;

  const set = await prisma.set.findFirst({
    where: {
      id: setId,
    },
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  if (!set) return <div>No set found</div>;

  return (
    <Card className="flex flex-col items-center justify-center max-w-96 mx-auto">
      <CardHeader className="text-center space-y-2">
        <CardTitle>{set.title}</CardTitle>
        <CardDescription>{set.description}</CardDescription>
        <CardDescription className="text-base font-semibold">
          {set._count.questions} questions
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          href={`/sets/${set.id}/play`}
          className={buttonVariants({ size: "lg" })}
        >
          Start
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Page;
