import { format, isValid, parseISO } from "date-fns";

const dateFormat = (
  date: Date | string,
  pattern: string = "dd MMM, yyyy",
): string => {
  try {
    // Parse date properly
    let dateObj: Date;
    if (typeof date === 'string') {
      dateObj = parseISO(date);
    } else {
      dateObj = date;
    }

    // Validate date
    if (!isValid(dateObj)) {
      console.warn(`Invalid date: ${date}`);
      return String(date);
    }

    const output = format(dateObj, pattern);
    return output;
  } catch (error) {
    console.error(`Error formatting date: ${date}`, error);
    return String(date);
  }
};

export default dateFormat;
