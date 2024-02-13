export const checkArrUpdate = (prev: any[], cur: any[]) => {
  const curArr = Array.from(cur);
  return curArr.length !== prev?.length || !prev?.every((item) => curArr.includes(item));
};
