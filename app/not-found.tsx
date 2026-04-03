import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-title text-6xl font-black text-[#1E9A66] sm:text-8xl">
        404
      </h1>
      <h2 className="mt-4 font-title text-2xl font-black uppercase text-[#161A1E] sm:text-3xl">
        Page introuvable
      </h2>
      <p className="mt-4 max-w-md font-ui text-base text-black/60">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2DB180] px-8 py-3 font-ui text-sm font-bold text-white transition-colors hover:bg-[#26a072]"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
