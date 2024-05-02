import { useState, useEffect, useRef, RefObject } from 'react';

export const useOnScreen = (
  options: IntersectionObserverInit
): { ref: RefObject<HTMLDivElement>; isVisible?: boolean } => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>();

  useEffect(() => {
    if (ref.current) {
      const currentRef = ref.current;

      const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, options);

      observer.observe(currentRef);

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }
  }, [options, ref]);

  return { ref, isVisible };
};
