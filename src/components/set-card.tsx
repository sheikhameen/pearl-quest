import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface SetCardProps {
  title: string;
  questionsCount: number;
}
const SetCard = ({ title, questionsCount }: SetCardProps) => {
  return (
    <Card className="border-none bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-primary-foreground rounded-2xl shadow-xl hover:scale-105 transition-transform">
      <CardHeader className="pb-0">
        <CardTitle className="text-3xl">{title}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <p>Number of questions: {questionsCount}</p>
        <Button size="lg" className="bg-primary/70">
          Start
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SetCard;
