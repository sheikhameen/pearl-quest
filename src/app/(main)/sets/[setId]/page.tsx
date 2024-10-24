import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ setId: string }> }) => {
  const { setId } = await params;

  const set = await prisma.set.findFirst({
    where: {
      id: setId,
    },
  });

  if (!set) return <div>No set found</div>;

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-96">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {set.title}
      </h1>
      <p className="text-xs text-muted-foreground text-center">
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </p>
      <Link
        href={`/sets/${set.id}/play`}
        className={buttonVariants({ size: "lg" })}
      >
        Start
      </Link>
    </div>
  );
};

export default Page;
