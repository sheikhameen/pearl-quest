import SetCard from "@/components/set-card";
import prisma from "@/lib/prisma";

const Page = async () => {
  const sets = await prisma.set.findMany({
    include: {
      questions: true,
    },
  });

  return (
    <div className="p-4 space-y-2">
      {sets.map((set) => (
        <SetCard
          key={set.id}
          title={set.title}
          questionsCount={set.questions.length}
        />
      ))}
    </div>
  );
};

export default Page;
