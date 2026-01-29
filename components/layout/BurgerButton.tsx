"use client";

interface BurgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function BurgerButton({ isOpen, onClick }: BurgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative z-50 flex h-12 w-12 flex-col items-center justify-center rounded-lg transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2DB180] lg:hidden"
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isOpen}
    >
      <div className="relative h-5 w-6">
        {/* Top line */}
        <span
          className={`absolute left-0 top-0 block h-0.5 w-full bg-white transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isOpen ? "top-[9px] w-full rotate-45" : "top-0 w-full"
          }`}
        />

        {/* Middle line */}
        <span
          className={`absolute left-0 top-[9px] block h-0.5 bg-white transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isOpen ? "w-0 opacity-0" : "w-full opacity-100"
          }`}
        />

        {/* Bottom line */}
        <span
          className={`absolute left-0 block h-0.5 w-full bg-white transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isOpen ? "top-[9px] w-full -rotate-45" : "top-[18px] w-full"
          }`}
        />
      </div>
    </button>
  );
}
