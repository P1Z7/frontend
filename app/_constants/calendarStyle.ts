export const CALENDAR_STYLE = `
.my-day_range_start.my-selected {
  background-color: #FF50AA;
  color: white;
  border-radius: 100%;
}
.my-day_range_end.my-selected{
  background-color: #FF50AA;
  color: white;
  border-radius: 100%;
}
.my-selected { 
  background-color: #ffeaf4;
  border-radius: 0;
}
.my-selected:hover { 
  color: black;
  font-weight: 700;
}
.rdp-button:hover:not([disabled]):not(.my_selected) {
  background-color: #ffeaf4;
  font-weight:700;
}
`;

export const MYPAGE_CALENDAR_STYLE = `
.react-calendar {
  width: 320px;
  padding: 0 ;
  font-family: Pretendard; 
  border: 0;

  @media (min-width: 768px) {
    width: 688px;
  }

  @media (min-width: 1200px) {
    width: 756px;
  }
}

.react-calendar__navigation {
  height: 24px;

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 150px;
    margin-bottom: 16px;
  }

  @media (min-width: 1200px) {
    padding: 10px 200px;
  }
}

.react-calendar__navigation button {
  color: black;
  min-width: 16px;
  padding: 0 24px;
  background: none;
  font-weight: 500;
  font-size: 1.6rem;
}

.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
  background-color: white;
}

.react-calendar__month-view__weekdays {
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;
  padding-bottom: 0.4rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 400;
  }
}

.react-calendar__month-view__weekdays abbr {
  color: #C1C5CC;
  text-decoration: none;
}

.react-calendar__tile {
  width: 44px;
  min-height: 44px;
  height: auto;
  text-align: center;
  padding: 2px 6.6667px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;

  @media (min-width: 768px) {
    display: flex;
    min-height: 52px;
    width: 96px;
    padding-top: 4px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  @media (min-width: 1200px) {
    width: 108px;
    min-height: 60px;
  }
}

.react-calendar__tile > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.react-calendar__month-view__days__day {
  font-size: 1rem;
  font-family: Pretendard; 
  font-weight: 500;
  color: #1C1E22;
  border-right: 1px solid #F1F2F4 ;
  border-bottom: 1px solid #F1F2F4 ;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 400;
  }
}

.react-calendar__month-view__days__day--weekend {
  color: #F63D3D;
}

.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--weekend):not(.react-calendar__month-view__days__day--neighboringMonth)
  + .react-calendar__month-view__days__day--weekend {
  color: #1C1E22;
}

.react-calendar__month-view__days__day--neighboringMonth {
  color: #D2D5DA; 
}

.react-calendar__tile abbr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 3.6rem;
  height: 1.2rem;
  border-radius: 0.4rem;

  @media (min-width: 768px) {
    border-radius: 0.8rem;
    width: 2.4rem;
    height: 1.6rem;
  }
}

.react-calendar__tile:enabled:hover,
.react-calendar__tile--now:hover {
  background: #F1F2F3;
  border-radius: 4px;
}

.react-calendar__tile:enabled:focus abbr,
.react-calendar__tile--active abbr {
  background-color: rgba(255, 80, 170, 0.2);
}

.react-calendar__tile:enabled:focus,
.react-calendar__tile--active {
  background: none;
  color: #1C1E22;
}

.react-calendar__tile--now abbr {
  background-color: #F1F2F3;
}
.react-calendar__tile--now {
  background: none;
  color: #1C1E22;
}

@media (min-width: 768px) {
  .react-calendar__month-view__weekdays__weekday {
    border-top: 1px solid #F1F2F4;
    border-right: 1px solid #F1F2F4;
    border-bottom: 1px solid #F1F2F4;
  }
  
  .react-calendar__month-view__weekdays__weekday--weekend {
    border-right: 0px;
  }
  
  .react-calendar__month-view__weekdays__weekday:not(.react-calendar__month-view__weekdays__weekday--weekend):not(.react-calendar__month-view__weekdays__weekday--neighboringMonth)
    + .react-calendar__month-view__weekdays__weekday--weekend {
      border-right: 1px solid #F1F2F4;
  }
  
  .react-calendar__tile.react-calendar__month-view__days__day {
    border-right: 1px solid #F1F2F4;
    border-bottom: 1px solid #F1F2F4;
  }
  
  .react-calendar__tile.react-calendar__month-view__days__day--weekend {
    border-right: 0px;
  }
  
  .react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--weekend):not(.react-calendar__month-view__days__day--neighboringMonth)
    + .react-calendar__month-view__days__day--weekend {
    border-right: 1px solid #F1F2F4;
  }
}
`;
