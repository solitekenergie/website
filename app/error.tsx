"use client";

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void _error;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-title text-3xl font-black uppercase text-[#161A1E] sm:text-4xl">
        Une erreur est survenue
      </h1>
      <p className="mt-4 max-w-md font-ui text-base text-black/60">
        Nous sommes désolés, quelque chose s&apos;est mal passé. Veuillez réessayer.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-[#2DB180] px-8 py-3 font-ui text-sm font-bold text-white transition-colors hover:bg-[#26a072]"
      >
        Réessayer
      </button>
    </div>
  );
}
