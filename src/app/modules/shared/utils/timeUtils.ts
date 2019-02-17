export const TODAY = new Date();

export const FIRST_OF_CURRENT_MONTH = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  1
);

export const FIRST_OF_PREVIOUS_MONTH = new Date(
  TODAY.getMonth() === 1 ? TODAY.getFullYear() - 1 : TODAY.getFullYear(),
  TODAY.getMonth() === 1 ? 12 : TODAY.getMonth() - 1,
  1
);

export const convertToDate = (date: Date) => new Date(date);

