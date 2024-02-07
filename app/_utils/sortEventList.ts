import { ScheduleDataProps } from "@/(route)/(bottom-nav)/mypage/page";

export const sortEvents = (events: ScheduleDataProps[]) => {
  const sortedEvents = events.sort((a, b) => {
    const startDateA = new Date(a.startDate).getTime();
    const startDateB = new Date(b.startDate).getTime();

    if (startDateA === startDateB) {
      const endDateA = new Date(a.endDate).getTime();
      const endDateB = new Date(b.endDate).getTime();

      return endDateB - endDateA;
    }

    return startDateA - startDateB;
  });

  return sortedEvents;
};
