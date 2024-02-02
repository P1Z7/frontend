export const formatDate = (startDate: string, endDate: string, extend: boolean = false) => {
  const start = startDate.split("-");
  const end = endDate.split("-");

  if (extend) {
    return `${start[0].slice(2)}.${start[1]}.${start[2]} ~ ${end[0].slice(2)}.${end[1]}.${end[2]}`;
  }

  return `${start[1]}.${start[2]} ~ ${end[1]}.${end[2]}`;
};

export const formatAddress = (address: string) => {
  return address.split(" ")?.[1];
};
