import Link from "next/link";
import { PlusCircle } from "lucide-react";

import prisma from "@/lib/prisma";
import SetCard from "@/components/set-card";
import { buttonVariants } from "@/components/ui/button";

const Page = async () => {
  const sets = await prisma.set.findMany({
    include: {
      questions: true,
    },
  });

  return (
    <div className="p-4 space-y-2">
      <div className="flex justify-end">
        <Link href="/sets/new" className={buttonVariants()}>
          <PlusCircle /> Add new set
        </Link>
      </div>

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
