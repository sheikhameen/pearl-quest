import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <Skeleton className="w-full h-96 flex items-center justify-center">
      <Spinner size="large" />
    </Skeleton>
  );
};

export default Loading;
