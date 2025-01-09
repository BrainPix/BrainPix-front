export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  timeout = 500,
) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    if (timer) clearTimeout(timeout);

    timer = setTimeout(() => {
      result = func(...args);
    }, timeout);
    return result;
  };
};
