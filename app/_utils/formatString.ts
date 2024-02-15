import { format } from "date-fns";

export const formatDate = (startDate: string | null, endDate: string | null, extend: boolean = false) => {
  if (!(startDate && endDate)) {
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (extend) {
    return `${format(new Date(start), "yy.MM.dd")} ~ ${format(new Date(end), "yy.MM.dd")}`;
  }

  return `${format(new Date(start), "MM.dd")} ~ ${format(new Date(end), "MM.dd")}`;
};

export const formatAddress = (address: string) => {
  return address.split(" ")?.[1];
};
