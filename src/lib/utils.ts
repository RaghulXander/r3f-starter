export function omitKeys<T extends Record<string, any>, U extends (keyof T)[]>(
  obj: T,
  keys: U
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  ) as Pick<T, Exclude<keyof T, U[number]>>;
}

export function pickKeys<T extends Record<string, any>, U extends (keyof T)[]>(
  obj: T,
  keys: U
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  ) as Pick<T, Exclude<keyof T, U[number]>>;
}
