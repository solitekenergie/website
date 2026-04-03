import { GridSkeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div className="flex flex-col">
      <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-4 h-4 w-24 animate-pulse rounded bg-[#2DB180]/30" />
          <div className="h-12 w-48 animate-pulse rounded bg-white/10 lg:h-[72px] lg:w-64" />
          <div className="mt-6 h-5 w-[400px] max-w-full animate-pulse rounded bg-white/10" />
        </div>
      </section>
      <section className="w-full px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-[100px] lg:pt-[100px]">
        <div className="mx-auto max-w-[1440px]">
          <GridSkeleton count={6} />
        </div>
      </section>
    </div>
  );
}
