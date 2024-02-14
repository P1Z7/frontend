import { ReadonlyURLSearchParams } from "next/navigation";

interface QueryType {
  [key: string]: string | string[] | number | number[] | null;
}

export const createQueryString = (queries: QueryType, searchParams: ReadonlyURLSearchParams) => {
  const newParams = new URLSearchParams(searchParams.toString());

  for (const key in queries) {
    const value = queries[key];
    if (!value || (Array.isArray(value) && value.length === 0)) {
      newParams.delete(key);
      continue;
    }

    if (Array.isArray(value)) {
      const concatValues = value.join("|");
      newParams.set(key, concatValues);
      continue;
    }

    newParams.set(key, String(value));
  }

  return newParams.toString();
};
