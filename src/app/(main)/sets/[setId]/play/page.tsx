import prisma from "@/lib/prisma";
import Game from "@/components/game";

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
      <Game set={set} />
    </div>
  );
};

export default Page;
