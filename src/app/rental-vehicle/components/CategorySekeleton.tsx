import { Skeleton } from "@/components/ui/skeleton";

export function CategorySekeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-1 w-1 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            {/* <Skeleton className="h-4 w-[200px]" /> */}
          </div>
        </div>
      ))}
    </>
  );
}
