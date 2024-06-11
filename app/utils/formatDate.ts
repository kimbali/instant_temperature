/**
 * Formats a date string into a human-readable format with the full month name.
 * 
 * @param dateString - The date string to format.
 * @returns A formatted date string in the format "Day Month".
 * 
 * @example
 * formatDate("2024-06-09T18:35:00Z"); // "9 June"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const month = months[monthIndex];
  
  const formattedDay = day.toString();
  
  return `${formattedDay}${month.substring(3,0)}`;
}

/**
 * Formats a date string to return the day of the week.
 * 
 * @param dateString - The date string to format.
 * @returns The day of the week corresponding to the given date string.
 * 
 * @example
 * formatDay("2024-06-09T18:35:00Z"); // "Sunday"
 */
export function formatDay(dateString: string): string {
  const date = new Date(dateString);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = date.getUTCDay();
  
  return daysOfWeek[dayIndex];
}

/**
 * Formats a Date object into an ISO string format with a fixed time of "00:00:00Z".
 * 
 * @param dateString - The Date object to format.
 * @returns A formatted ISO string in the format "YYYY-MM-DDT00:00:00Z".
 * 
 * @example
 * const date = new Date("2024-06-09T18:35:00Z");
 * formatToISOString(date); // "2024-06-09T00:00:00Z"
 */
export function formatToISOString(dateString: Date): string {
  return dateString.toISOString().split('T')[0] + "T00:00:00Z";
}

export function formatToHyphens(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0'); 

  return `${year}-${month}-${day}`;
}