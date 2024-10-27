import Link from "next/link";
import { PlusCircle } from "lucide-react";

import prisma from "@/lib/prisma";
import SetCard from "@/components/set-card";
import { buttonVariants } from "@/components/ui/button";
import { Set } from "@prisma/client";

const Page = async () => {
  const sets = await prisma.set.findMany();

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <Link href="/sets/new" className={buttonVariants()}>
          <PlusCircle /> Add new set
        </Link>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {sets.map((set: Set) => (
          <SetCard key={set.id} set={set} />
        ))}
      </div>
    </div>
  );
};

export default Page;
