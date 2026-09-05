import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";

const CarouselContext = createContext(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export const Carousel = React.forwardRef(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const onSelect = useCallback((api) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const resetAutoplay = useCallback(() => {
      if (!emblaApi) return;
      const autoplay = emblaApi.plugins()?.autoplay;
      if (!autoplay) return;

      if (typeof autoplay.reset === "function") {
        autoplay.reset();
      }
      const isPlaying =
        typeof autoplay.isPlaying === "function" ? autoplay.isPlaying() : true;
      if (!isPlaying && typeof autoplay.play === "function") {
        autoplay.play();
      }
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
      emblaApi?.scrollPrev();
      resetAutoplay();
    }, [emblaApi, resetAutoplay]);

    const scrollNext = useCallback(() => {
      emblaApi?.scrollNext();
      resetAutoplay();
    }, [emblaApi, resetAutoplay]);

    const scrollTo = useCallback(
      (index) => {
        emblaApi?.scrollTo(index);
        resetAutoplay();
      },
      [emblaApi, resetAutoplay]
    );

    const handleKeyDown = useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    useEffect(() => {
      if (!emblaApi || !setApi) return;
      setApi(emblaApi);
    }, [emblaApi, setApi]);

    useEffect(() => {
      if (!emblaApi) return;
      onSelect(emblaApi);
      setScrollSnaps(emblaApi.scrollSnapList());
      emblaApi.on("reInit", onSelect);
      emblaApi.on("select", onSelect);

      return () => {
        emblaApi?.off("select", onSelect);
      };
    }, [emblaApi, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef: emblaRef,
          api: emblaApi,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollSnaps,
          resetAutoplay,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={`embla-carousel-root ${className}`}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="embla-carousel-viewport">
        <div
          ref={ref}
          className={`embla-carousel-container ${
            orientation === "horizontal" ? "embla-horizontal" : "embla-vertical"
          } ${className}`}
          {...props}
        />
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={`embla-carousel-item ${
          orientation === "horizontal" ? "" : "is-vertical"
        } ${className}`}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef(
  ({ className = "", onClick, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel();

    const handleClick = (event) => {
      scrollPrev();
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={`embla-carousel-btn embla-prev-btn ${className}`}
        disabled={!canScrollPrev}
        onClick={handleClick}
        aria-label="Previous slide"
        {...props}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef(
  ({ className = "", onClick, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();

    const handleClick = (event) => {
      scrollNext();
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={`embla-carousel-btn embla-next-btn ${className}`}
        disabled={!canScrollNext}
        onClick={handleClick}
        aria-label="Next slide"
        {...props}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";
