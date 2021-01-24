import moment from 'moment';

export function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

export function getNumOfDays(startDate, endDate) {
  const numOfDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000*60*60*24));
  return numOfDays
}

export function getMonthAndDayString(date) {
  const dateString = new Date(date).toDateString();

  return dateString.substring(0, dateString.length - 4);
}

export function createDateArray(startDate, numOfDays) {
  const days = [];
  for(let i = 0; i < numOfDays; i++) {
    days.push(moment(startDate).add(i, 'd').format('YYYY-MM-DD'));
  }
  return days;
}
export function getDateString(date) {
  return date.toDateString();
}

export function formatDateToString(date) {
  const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
}

export function formatDateString(dateString) {
  return dateString.substring(0, 10);
}