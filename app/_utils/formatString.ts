export const formatDate = (startDate: string, endDate: string) => {
  const start = startDate.split("-");
  const end = endDate.split("-");

  return `${start[1]}.${start[2].split("T")[0]} ~ ${end[1]}.${end[2].split("T")[0]}`;
};

export const formatAddress = (address: string) => {
  return address.split(" ")?.[1];
};
