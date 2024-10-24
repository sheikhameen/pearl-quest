import prisma from "@/lib/prisma";

const Page = async ({ params }: { params: Promise<{ setId: string }> }) => {
  const { setId } = await params;

  const set = await prisma.set.findFirst({
    where: {
      id: setId,
    },
  });

  if (!set) return <div>No set found</div>;

  return (
    <div>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {set.title}
        </h1>
        <p className="text-xs text-muted-foreground">
          The king, seeing how much happier his subjects were, realized the
          error of his ways and repealed the joke tax.
        </p>
      </div>
    </div>
  );
};

export default Page;
