import { RefObject, useEffect } from 'react';

interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  handler: (e: MouseEvent) => void;
}

export const useOutsideClick = ({ ref, handler }: UseOutsideClickProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  });
};
