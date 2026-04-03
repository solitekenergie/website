import { Skeleton } from "@/components/ui/Skeleton";

export default function RealisationsLoading() {
  return (
    <div className="flex flex-col">
      <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-4 h-4 w-32 animate-pulse rounded bg-[#2DB180]/30" />
          <div className="h-12 w-64 animate-pulse rounded bg-white/10 lg:h-[72px] lg:w-80" />
          <div className="mt-6 h-5 w-[500px] max-w-full animate-pulse rounded bg-white/10" />
        </div>
      </section>
      <section className="w-full px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-[100px] lg:pt-[100px]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
