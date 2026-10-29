import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  showArrows?: boolean;
  stepSize?: number;
  gradientColor?: string; // Tailwind gradient color class, e.g. "from-[#f8fafc]"
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  className = '',
  innerClassName = '',
  showArrows = true,
  stepSize = 240,
  gradientColor = 'from-[#f8fafc]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    // Small threshold (3px) to handle subpixel rounding
    setCanScrollLeft(scrollLeft > 3);
    setCanScrollRight(maxScroll > 3 && scrollLeft < maxScroll - 3);
  }, []);

  // Update scroll boundaries on mount, resize, and DOM mutations
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollState();

    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateScrollState();
      });
      resizeObserver.observe(el);
      if (el.firstElementChild) {
        resizeObserver.observe(el.firstElementChild);
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [updateScrollState, children]);

  // Handle standard desktop mouse wheel: convert vertical deltaY to horizontal scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If user holds Shift, native browser already scrolls horizontally
      if (e.shiftKey || e.deltaY === 0) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 3) return; // No horizontal overflow

      const canMoveRight = e.deltaY > 0 && el.scrollLeft < maxScroll - 2;
      const canMoveLeft = e.deltaY < 0 && el.scrollLeft > 2;

      if (canMoveRight || canMoveLeft) {
        // Prevent jarring page vertical jump and scroll container horizontally instead
        e.preventDefault();
        el.scrollLeft += e.deltaY * 0.95;
        updateScrollState();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [updateScrollState]);

  // Click & Drag-to-Scroll (Panning with mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    const el = containerRef.current;
    if (!el) return;

    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.25;

    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }

    el.scrollLeft = scrollLeftRef.current - walk;
    updateScrollState();
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      // Give a tiny tick so onClickCapture can intercept accidental button click
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  // Intercept click if the user was dragging to pan
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDraggedRef.current = false;
    }
  };

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const amount = stepSize || Math.max(200, el.clientWidth * 0.65);
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`relative flex items-center group/scroll ${className}`}>
      {/* Left Gradient Mask & Chevron */}
      {showArrows && canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center z-20 pointer-events-none">
          <div className={`w-12 h-full bg-gradient-to-r ${gradientColor} via-slate-50/80 to-transparent`} />
          <button
            type="button"
            onClick={() => scrollByDirection('left')}
            aria-label="Scroll left"
            className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 border border-slate-200/90 shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Scrollable Track */}
      <div
        ref={containerRef}
        onScroll={updateScrollState}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClickCapture={handleClickCapture}
        className={`w-full overflow-x-auto no-scrollbar scroll-smooth select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab md:cursor-auto'
        } ${innerClassName}`}
      >
        {children}
      </div>

      {/* Right Gradient Mask & Chevron */}
      {showArrows && canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end z-20 pointer-events-none">
          <div className={`w-12 h-full bg-gradient-to-l ${gradientColor} via-slate-50/80 to-transparent`} />
          <button
            type="button"
            onClick={() => scrollByDirection('right')}
            aria-label="Scroll right"
            className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 border border-slate-200/90 shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
