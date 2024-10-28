import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SetWithQuestionsCount } from "@/lib/types";

interface SetCardProps {
  set: SetWithQuestionsCount;
}
const SetCard = ({ set }: SetCardProps) => {
  return (
    <Link href={`/sets/${set.id}`} className="block">
      <Card className="h-full min-h-32 border-none bg-gradient-to-br from-indigo-500 to-indigo-700 text-primary-foreground  shadow-[0_6px_0_hsl(243.7_54.5_41.4)] hover:shadow-[0_3px_0_hsl(243.7_54.5_41.4)] hover:translate-y-[3px] active:shadow-[0_0px_0_hsl(243.7_54.5_41.4)] active:translate-y-[6px]">
        <CardHeader>
          <CardTitle className="line-clamp-2 leading-tight text-xl">
            {set.title}
          </CardTitle>
          <hr className="border-muted/30" />
          <CardDescription className="text-muted/80 line-clamp-3 text-xs">
            {set.description}
          </CardDescription>
          <CardDescription className="text-muted line-clamp-3 font-semibold text-sm">
            {set._count.questions} questions
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default SetCard;
