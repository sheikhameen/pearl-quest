import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

const Page = async ({ params }: { params: Promise<{ setId: string }> }) => {
  const { setId } = await params;

  const set = await prisma.set.findFirst({
    where: {
      id: setId,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  if (!set) return <div>No set found</div>;

  return (
    <div>
      {set.questions.map((question) => (
        <div key={question.id}>
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl">
            {question.text}
          </h1>
          <div className="grid grid-cols-2 gap-1">
            {question.answers.map((answer, index) => (
              <Button
                key={answer.id}
                variant="secondary"
                className={cn(
                  "rounded-xl",
                  index === 0 && "text-red-700 border-red-700/50 border-2",
                  index === 1 &&
                    "text-orange-700 border-orange-700/50 border-2",
                  index === 2 && "text-green-700 border-green-700/50 border-2",
                  index === 3 && "text-blue-700 border-blue-700/50 border-2"
                )}
              >
                {answer.text}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
