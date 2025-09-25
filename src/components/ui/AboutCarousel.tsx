"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./Button";

type AboutCarouselItem = {
  _id: string;
  title: string;
  description?: string;
  image?: {
    asset?: { url: string };
    alt?: string;
  };
  ctaText?: string;
  ctaUrl?: string;
  displayOrder: number;
  isActive: boolean;
};

type AboutCarouselProps = {
  items: AboutCarouselItem[];
};

export function AboutCarousel({ items }: AboutCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Filter active items and sort by display order
  const activeItems = items
    .filter((item) => item.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (activeItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeItems.length]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Simple touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeItems.length > 1) {
      goToNext();
    }
    if (isRightSwipe && activeItems.length > 1) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (activeItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500 text-sm">
          No carousel items yet. Add some "About Carousel Items" in Sanity to
          see the carousel here.
        </p>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div
        className="relative overflow-hidden md:pointer-events-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {activeItems.map((item, index) => (
            <div
              key={item._id}
              className="min-h-[400px] md:min-h-[300px] flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-8 md:gap-12 px-4 md:px-16 py-8 w-full flex-shrink-0"
            >
              {/* Image */}
              {item.image?.asset?.url && (
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto md:mx-0">
                    <Image
                      src={item.image.asset.url}
                      alt={item.image.alt || item.title}
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 160px, 192px"
                      priority={index === currentIndex}
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 max-w-none md:max-w-2xl flex flex-col justify-start">
                <h3 className="text-2xl md:text-3xl font-light text-neutral-800 mb-4 leading-tight">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* CTA Button */}
                {item.ctaText && item.ctaUrl && (
                  <div className="pt-2">
                    {item.ctaUrl.startsWith("http") ? (
                      <a
                        href={item.ctaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button
                          variant="secondary"
                          className="shadow-md hover:shadow-lg"
                        >
                          {item.ctaText}
                        </Button>
                      </a>
                    ) : (
                      <a href={item.ctaUrl} className="inline-block">
                        <Button
                          variant="secondary"
                          className="shadow-md hover:shadow-lg"
                        >
                          {item.ctaText}
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Desktop only */}
      {activeItems.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-neutral-700 hover:text-neutral-900"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-neutral-700 hover:text-neutral-900"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot Navigation */}
      {activeItems.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {activeItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-[#D4B896] scale-110"
                  : "bg-[#D4B896]/30 hover:bg-[#D4B896]/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Instructions */}
      <div className="text-center mt-4">
        <p className="text-xs text-neutral-500">
          <span className="hidden md:inline">
            Use arrows or dots to navigate
          </span>
          <span className="md:hidden">Swipe or tap dots to navigate</span>
        </p>
      </div>
    </div>
  );
}
