"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PrimaryCta from "../ui/PrimaryCta";
import { AnimatedLink } from "../ui/AnimatedLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ href: string; label: string }>;
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[85vw] max-w-md bg-[#161A1E] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        {/* Menu content */}
        <div className="flex h-full flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-end p-6">
            <button
              onClick={onClose}
              className="group relative h-12 w-12 rounded-full transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2DB180]"
              aria-label="Fermer le menu"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-8 pt-12">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className={`transform transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${100 + index * 50}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group relative block overflow-hidden py-4 font-ui text-3xl font-bold"
                    style={{ color: '#ffffff' }}
                  >
                    <AnimatedLink>
                      <span className="relative inline-block">
                        {item.label}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#2DB180] to-[#23A3D2] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </AnimatedLink>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA button */}
          <div
            className={`px-8 pb-12 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: isOpen ? `${100 + navItems.length * 50}ms` : "0ms",
            }}
          >
            <PrimaryCta href="/estimateur" className="w-full justify-center">
              Mon estimation
            </PrimaryCta>
          </div>

          {/* Decorative gradient */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#2DB180] via-[#23A3D2] to-transparent opacity-50" />
        </div>
      </div>
    </>
  );
}
