'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';

const images = [
  {
    src: '/images/solitek-installation-solaire-toiture-maison-alsace.jpg',
    alt: 'Installation solaire sur toiture de maison en Alsace',
    position: 'center 35%',
  },
  {
    src: '/images/solitek-panneaux-solaires-toiture-maison-alsacienne.jpg',
    alt: 'Maison alsacienne équipée de panneaux solaires sur toiture',
    position: 'center 55%',
  },
  {
    src: '/images/solitek-installation-photovoltaique-batiment-professionnel.jpg',
    alt: 'Installation photovoltaïque sur bâtiment professionnel en Alsace',
    position: 'center 65%',
  },
  {
    src: '/images/solitek-technicien-pose-panneaux-solaires-strasbourg.jpg',
    alt: 'Technicien solaire vérifiant une installation',
    position: 'center 35%',
  },
  {
    src: '/images/solitek-toiture-equipee-panneaux-solaires-alsace.jpg',
    alt: "Vue aérienne d'une toiture équipée de panneaux solaires",
    position: 'center',
  },
];

const N = images.length;
// Triple-clone : [copy, original, copy] - index N pointe sur le 1er slide réel
const SLIDE_RATIO = 0.72; // 72 % de largeur de container par slide
const GAP = 16; // px

export function MissionSection() {
  const allSlides = useMemo(() => [...images, ...images, ...images], []);

  // virtualIndex démarre sur le 1er slide réel (middle copy)
  const [vIdx, setVIdx] = useState(N);
  // Désactiver la transition pendant le saut silencieux
  const [noAnim, setNoAnim] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  // Mesure du container (ResizeObserver)
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Auto-avance
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setVIdx((v) => v + 1);
    }, 4000);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [startAuto]);

  // Après la fin d'une transition CSS, saut silencieux si on est dans la zone clone
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      // On ne réagit qu'au transform du track lui-même
      if (e.propertyName !== 'transform') return;
      setVIdx((v) => {
        if (v < N) return v + N;
        if (v >= 2 * N) return v - N;
        return v;
      });
      // Désactiver l'animation pour le saut silencieux
      setNoAnim(true);
    },
    [],
  );

  // Ré-activer l'animation au frame suivant après le saut
  useEffect(() => {
    if (!noAnim) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setNoAnim(false));
    });
    return () => cancelAnimationFrame(id);
  }, [noAnim]);

  const goNext = useCallback(() => {
    setVIdx((v) => v + 1);
    startAuto();
  }, [startAuto]);

  const goPrev = useCallback(() => {
    setVIdx((v) => v - 1);
    startAuto();
  }, [startAuto]);

  // Clic sur un dot → va directement dans la zone réelle (middle copy)
  const goToDot = useCallback(
    (dotI: number) => {
      setVIdx(N + dotI);
      setNoAnim(false);
      startAuto();
    },
    [startAuto],
  );

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };
  const onMouseLeave = () => { isDragging.current = false; };

  // Calcul du translateX pour centrer le slide actif
  const slideWidth = containerWidth * SLIDE_RATIO;
  const sideOffset = (containerWidth - slideWidth) / 2;
  const translateX = containerWidth > 0 ? sideOffset - vIdx * (slideWidth + GAP) : 0;

  // Dot actif = position dans les slides originaux
  const dotIndex = ((vIdx % N) + N) % N;

  return (
    <section className="inline-flex w-full flex-col items-center pb-8 sm:pb-12 lg:pb-[60px]">
      {/* Texte */}
      <div className="self-stretch px-4 pb-8 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:px-20 lg:pb-16 lg:pt-[100px]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">

          {/* Qui sommes-nous */}
          <FadeIn className="flex flex-col gap-4">
            <p className="font-ui text-xs font-semibold uppercase tracking-wide text-[#1E9A66]">
              Qui sommes-nous ?
            </p>
            <h2 className="font-title text-3xl font-black uppercase leading-tight text-[#161A1E] sm:text-4xl lg:text-[40px] lg:leading-tight">
              Votre partenaire énergie à Strasbourg
            </h2>
            <p className="font-ui text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[27px]">
              SOLITEK, c&apos;est avant tout un expert du terrain. Formé au sein des leaders de l&apos;énergie en Alsace (ES Énergie, FranceSolar, Groupe Beyer), notre fondateur a créé SOLITEK avec une ambition simple : vous offrir un service que les grandes structures ne peuvent pas garantir. Un interlocuteur unique, des conseils honnêtes, et des installations réalisées dans les règles de l&apos;art. Résultat : des clients satisfaits qui nous recommandent, et un accompagnement humain du premier appel à la mise en service.
            </p>
          </FadeIn>

          {/* Notre mission */}
          <FadeIn className="flex flex-col gap-4" delay={150}>
            <p className="font-ui text-xs font-semibold uppercase tracking-wide text-[#1E9A66]">
              Notre engagement
            </p>
            <h2 className="font-title text-3xl font-black uppercase leading-tight text-[#161A1E] sm:text-4xl lg:text-[40px] lg:leading-tight">
              Devis gratuit, conseil sans engagement
            </h2>
            <p className="font-ui text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[27px]">
              Visite technique, étude personnalisée, élaboration du projet : tout est gratuit et sans engagement. Pas de surprise, pas de frais cachés. Nous vous aidons à choisir la meilleure solution pour votre habitat, qu&apos;il s&apos;agisse de panneaux solaires, d&apos;une pompe à chaleur, de climatisation ou d&apos;électricité. Et après l&apos;installation, nous restons disponibles : un vrai suivi humain, réactif, pour que votre investissement soit rentable sur le long terme.
            </p>
          </FadeIn>

        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full select-none">
        {/* Wrapper clippant - aucun overflow, aucune scrollbar */}
        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {/* Boutons flèches - dans le wrapper clippant, centrés sur la zone image fixe */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white sm:left-5 lg:left-8"
            aria-label="Image précédente"
          >
            <svg className="h-5 w-5 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white sm:right-5 lg:right-8"
            aria-label="Image suivante"
          >
            <svg className="h-5 w-5 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Track - déplacé par translateX, jamais scrollé */}
          <div
            className="flex py-6 lg:py-10"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${translateX}px)`,
              transition: noAnim ? 'none' : 'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {allSlides.map((image, index) => {
              const isActive = index === vIdx;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 transition-all duration-700"
                  style={{ width: containerWidth > 0 ? `${slideWidth}px` : '72%' }}
                  onClick={() => !isActive && goToDot(index % N)}
                >
                  <div
                    className={`relative h-[280px] overflow-hidden rounded-2xl transition-opacity duration-700 sm:h-[370px] lg:h-[460px] ${
                      isActive ? 'opacity-100' : 'cursor-pointer opacity-40'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="72vw"
                      draggable={false}
                      priority={index === N}
                      className={`object-cover transition-transform duration-700 ${
                        isActive ? 'scale-100' : 'scale-110'
                      }`}
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 pb-4 pt-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToDot(index)}
              aria-label={`Image ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === dotIndex
                  ? 'w-8 bg-[#2DB180]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
