export const delayed = (miliseconds: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, miliseconds);
  });
};
