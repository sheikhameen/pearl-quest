import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Set } from "@prisma/client";

interface SetCardProps {
  set: Set;
}
const SetCard = ({ set }: SetCardProps) => {
  return (
    <Link href={`/sets/${set.id}`} className="block">
      <Card className="border-none bg-gradient-to-r from-indigo-500 to-indigo-700 text-primary-foreground rounded-2xl shadow-xl hover:scale-95 transition-transform">
        <CardHeader>
          <CardTitle>{set.title}</CardTitle>
          <CardDescription className="text-muted/80">
            {set.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default SetCard;
