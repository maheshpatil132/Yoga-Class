export function compareDates(dateString1, dateString2) {
    // Parse date strings into Date objects
    const date1 = parseDateString(dateString1);
    const date2 = parseDateString(dateString2);
  
    // Compare the dates
    return date1 <= date2;
  }
  
  function parseDateString(dateString) {
    const [dd, mm, yyyy] = dateString.split('-');
    return new Date(`${mm}-${dd}-${yyyy}`);
  }
  