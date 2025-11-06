import { format } from "date-fns";

export function toLocalTime(
  utcString: string,
  formatPattern = "dd/MM/yyyy, hh:mm a"
): string {
  if (!utcString) return "-";
  try {
    const normalized = utcString.endsWith("Z") ? utcString : `${utcString}Z`;
    const date = new Date(normalized);
    return format(date, formatPattern);
  } catch {
    return utcString;
  }
}


