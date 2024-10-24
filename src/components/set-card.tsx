import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";

interface SetCardProps {
  title: string;
}
const SetCard = ({ title }: SetCardProps) => {
  return (
    <Card className="border-none bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-primary-foreground rounded-2xl shadow-xl hover:scale-95 transition-transform">
      <CardContent className="p-6 flex justify-between items-center">
        <CardTitle className="text-3xl">{title}</CardTitle>
        <Button size="lg" className="bg-primary/70">
          Start
        </Button>
      </CardContent>
    </Card>
  );
};

export default SetCard;
