export const checkArrUpdate = (prev: any[], cur: any[]) => {
  return cur.length !== prev?.length || !prev?.every((item) => cur.includes(item));
};
