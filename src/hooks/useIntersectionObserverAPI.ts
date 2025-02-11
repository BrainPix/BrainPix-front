import { useCallback, useEffect, useState } from 'react';

interface useIntersectionObserverAPIPropsType {
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void;
}

export const useIntersectionObserverAPI = ({
  onIntersect,
}: useIntersectionObserverAPIPropsType) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const callback = useCallback(
    (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ): void => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          console.log(entry);
          onIntersect(entry, observer);
        }
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(callback);
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [target, callback]);

  return { setTarget };
};
