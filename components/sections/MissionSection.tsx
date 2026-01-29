'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from 'react';

const images = [
  {
    src: '/images/mission-installation-01.jpg',
    alt: 'Installation de panneaux solaires sur une toiture résidentielle',
  },
  {
    src: '/images/mission-panneaux-02.jpg',
    alt: 'Rangée de panneaux solaires captant la lumière du soleil',
  },
  {
    src: '/images/mission-detail-technique-03.jpg',
    alt: 'Détail technique d\'un panneau solaire et de son câblage',
  },
  {
    src: '/images/mission-technicien-04.jpg',
    alt: 'Technicien solaire vérifiant une installation',
  },
  {
    src: '/images/mission-toiture-05.jpg',
    alt: 'Vue aérienne d\'une toiture équipée de panneaux solaires',
  },
];

export function MissionSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  // Reset auto-scroll on manual interaction
  const resetAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoScroll();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetAutoScroll();
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetAutoScroll();
  };

  // Calculate scale for each image based on distance from center
  const getScale = (index: number) => {
    const distance = Math.abs(index - currentIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.85;
    return 0.7;
  };

  // Handle scroll to update current index
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft + container.offsetWidth / 2;
    const children = Array.from(container.children) as HTMLElement[];

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(scrollPosition - childCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== currentIndex) {
      setCurrentIndex(closestIndex);
      resetAutoScroll();
    }
  };

  // Scroll to specific image
  useEffect(() => {
    if (carouselRef.current) {
      const children = Array.from(carouselRef.current.children) as HTMLElement[];
      const targetChild = children[currentIndex];

      if (targetChild) {
        const containerWidth = carouselRef.current.offsetWidth;
        const targetCenter = targetChild.offsetLeft + targetChild.offsetWidth / 2;
        const scrollPosition = targetCenter - containerWidth / 2;

        carouselRef.current.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth',
        });
      }
    }
  }, [currentIndex]);

  return (
    <section className="inline-flex w-full flex-col items-center pb-8 sm:pb-12 lg:pb-[60px]">
      <div className="flex flex-col items-center gap-6 self-stretch px-4 pb-8 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:px-20 lg:pb-20 lg:pt-[100px]">
        <h2 className="text-center font-title text-3xl font-black uppercase leading-tight text-[#2DB180] sm:text-4xl sm:leading-[1.4] lg:text-[56px] lg:leading-[78.40px]">
          Notre mission
        </h2>
        <p className="max-w-[800px] px-4 text-center font-['Figtree'] text-base leading-relaxed text-black sm:text-lg sm:leading-[27px]">
          Chez SOLITEK, nous croyons qu&apos;une transition énergétique réussie passe par la proximité, la transparence et la confiance.
          Nous accompagnons chaque client avec une approche sur mesure, du conseil à l&apos;installation, pour garantir la performance et la durabilité de chaque projet.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:scale-110 hover:bg-white sm:left-8 lg:left-20"
          aria-label="Image précédente"
        >
          <svg className="h-6 w-6 text-[#2DB180]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:scale-110 hover:bg-white sm:right-8 lg:right-20"
          aria-label="Image suivante"
        >
          <svg className="h-6 w-6 text-[#2DB180]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Images Container */}
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto py-8 scrollbar-hide sm:gap-3 lg:gap-4 lg:py-12"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingLeft: 'calc(50vw - 140px)',
            paddingRight: 'calc(50vw - 140px)',
          }}
        >
          {images.map((image, index) => {
            const scale = getScale(index);
            const isCenter = index === currentIndex;

            return (
              <div
                key={index}
                className="flex shrink-0 snap-center items-center justify-center transition-all duration-700 ease-in-out"
                style={{
                  transform: `scale(${scale})`,
                  opacity: scale < 0.75 ? 0.5 : 1,
                }}
              >
                <div
                  className={`cursor-pointer overflow-hidden rounded ${
                    isCenter
                      ? 'h-[280px] w-[280px] p-4 sm:h-[350px] sm:w-[350px] sm:p-6 lg:h-[400px] lg:w-[400px] lg:p-8'
                      : 'h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px]'
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <img
                    className={`h-full w-full object-cover ${isCenter ? 'rounded' : ''}`}
                    src={image.src}
                    alt={image.alt}
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 pb-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-[#2DB180]'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
