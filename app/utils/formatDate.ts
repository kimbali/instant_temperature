export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const month = months[monthIndex];
  
  const formattedDay = day.toString();
  
  return `${formattedDay} ${month.substring(3,0)}`;
}

export function formatDay(dateString: string): string {
  const date = new Date(dateString);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayIndex = date.getUTCDay();
  
  return daysOfWeek[dayIndex];
}