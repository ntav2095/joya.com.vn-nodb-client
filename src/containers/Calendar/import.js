export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const getDayNow = () => new Date().getDay();
export const getDateNow = () => new Date().getDate();
export const getYearNow = () => new Date().getYear();
