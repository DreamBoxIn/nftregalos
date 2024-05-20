// utils/dateUtils.ts
export const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };
  
  export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };
  
  export const isPast = (date: Date, today: Date) => {
    return date < today && date.toDateString() !== today.toDateString();
  };
  