import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function PostsLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-10 px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      <div className="bg-muted/50 p-6 rounded-xl border border-border">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden border-border">
            <CardHeader className="pb-2">
              <Skeleton className="h-7 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter className="pt-0 flex justify-between">
              <div className="flex gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
