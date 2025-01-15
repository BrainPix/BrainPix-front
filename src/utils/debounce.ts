import { ChangeEvent } from 'react';

interface DebounceProps {
  handler: (e: ChangeEvent<HTMLInputElement>) => void;
  timeout?: number;
}

export const debounce = ({ handler, timeout = 500 }: DebounceProps) => {
  let timer: ReturnType<typeof setTimeout>;

  return (e: ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timeout);

    timer = setTimeout(() => {
      handler(e);
    }, timeout);
  };
};
