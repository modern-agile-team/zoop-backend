export const createFactoryProps = <T extends object>(
  generators: { [K in keyof T]: T[K] },
  overrides?: Partial<T>,
): T => {
  const base = {} as T;

  (Object.keys(generators) as Array<keyof T>).forEach((key) => {
    base[key] = generators[key];
  });

  return Object.assign(base, overrides);
};
