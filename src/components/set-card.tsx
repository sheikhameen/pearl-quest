import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Set } from "@prisma/client";

interface SetCardProps {
  set: Set;
}
const SetCard = ({ set }: SetCardProps) => {
  return (
    <Link href={`/sets/${set.id}`} className="block">
      <Card className="h-full min-h-36 border-none bg-gradient-to-br from-indigo-500 to-indigo-700 text-primary-foreground  shadow-[0_6px_0_hsl(243.7_54.5_41.4)] hover:shadow-[0_3px_0_hsl(243.7_54.5_41.4)] hover:translate-y-[3px] active:shadow-[0_0px_0_hsl(243.7_54.5_41.4)] active:translate-y-[6px]">
        <CardHeader>
          <CardTitle>{set.title}</CardTitle>
          <CardDescription className="text-muted/80 line-clamp-3">
            {set.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default SetCard;
