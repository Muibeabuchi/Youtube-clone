import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses an ISO 8601 duration string (commonly used by YouTube API)
 * into a human-readable "MM:SS" or "HH:MM:SS" format.
 *
 * @param isoDuration The ISO 8601 duration string (e.g., "PT2M30S", "PT1H15M45S").
 * @returns A formatted duration string (e.g., "2:30", "1:15:45").
 */
export function parseYouTubeDuration(isoDuration: string): string {
  // Regex to capture hours, minutes, and seconds.
  // The (?:...) makes the groups non-capturing for the 'PT' part,
  // and the ? makes H, M, S groups optional.
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  // If no match, return an empty string or throw an error, depending on desired behavior.
  // For simplicity, we'll return an empty string here.
  if (!match) {
    console.warn(`Invalid ISO 8601 duration format: ${isoDuration}`);
    return "";
  }

  // Use optional chaining and nullish coalescing to safely get values,
  // ensuring they are numbers for parseInt.
  // match[1] corresponds to hours, match[2] to minutes, match[3] to seconds.
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Handle cases where duration might be 0 or invalid
  if (totalSeconds === 0 && isoDuration !== "PT0S") {
    // "PT0S" is a valid zero duration
    return "0:00";
  }

  // Format the time
  const parts: string[] = [];

  if (hours > 0) {
    // Add hours, pad with leading zero if less than 10
    parts.push(String(hours));
    // Pad minutes and seconds with leading zeros when hours are present
    parts.push(String(minutes).padStart(2, "0"));
    parts.push(String(seconds).padStart(2, "0"));
  } else {
    // Only minutes and seconds
    parts.push(String(minutes));
    parts.push(String(seconds).padStart(2, "0"));
  }

  return parts.join(":");
}

// // Test cases
// const duration1 = "PT2M30S";
// console.log(`"${duration1}" parsed as: ${parseYouTubeDuration(duration1)}`); // Output: "2:30"

// const duration2 = "PT1H15M45S";
// console.log(`"${duration2}" parsed as: ${parseYouTubeDuration(duration2)}`); // Output: "1:15:45"

// const duration3 = "PT5S";
// console.log(`"${duration3}" parsed as: ${parseYouTubeDuration(duration3)}`); // Output: "0:05"

// const duration4 = "PT1H";
// console.log(`"${duration4}" parsed as: ${parseYouTubeDuration(duration4)}`); // Output: "1:00:00"

// const duration5 = "PT30M";
// console.log(`"${duration5}" parsed as: ${parseYouTubeDuration(duration5)}`); // Output: "30:00"

// const duration6 = "P0D"; // Example of a duration with only P and D (no T) - will result in 0:00
// console.log(`"${duration6}" parsed as: ${parseYouTubeDuration(duration6)}`); // Output: "" (or "0:00" if you prefer)

// const duration7 = "PT0S";
// console.log(`"${duration7}" parsed as: ${parseYouTubeDuration(duration7)}`); // Output: "0:00"

export const convertISOtoPublishedDate = (isoString: string) => {
  const dateObject = new Date(isoString);

  // Option 1: Using toLocaleDateString for a flexible, localized format
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return dateObject.toLocaleDateString("en-US", options);
};

/**
 * Formats a number into a human-readable string similar to YouTube view counts (e.g., 206K, 2.1M).
 *
 * @param num The number to format (e.g., 206982).
 * @returns The formatted string (e.g., "206K", "2.1M").
 */
export function formatYouTubeViewCount(num: number): string {
  if (num < 1000) {
    return String(num); // Numbers less than 1000 are displayed as-is
  }

  const absNum = Math.abs(num); // Work with absolute value for calculations

  // Define the thresholds and suffixes
  const units = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" }, // 1,000
    { value: 1e6, symbol: "M" }, // 1,000,000
    { value: 1e9, symbol: "B" }, // 1,000,000,000
  ];

  // Find the appropriate unit
  let i = units.length - 1;
  while (i > 0 && absNum < units[i].value) {
    i--;
  }

  const unit = units[i];
  const scaledNum = num / unit.value;

  // Determine decimal places:
  // If it's a 'K' or 'M' number, and it has a significant decimal part (e.g., 2.1M),
  // we show one decimal. Otherwise, if it's a whole number (e.g., 200K), no decimals.
  // YouTube typically shows one decimal place only if it's not a round number (e.g., 1.2K, not 1.0K)
  if (unit.symbol !== "" && Math.abs(scaledNum % 1) > 0.05) {
    // Check for significant decimal (e.g., 0.1, 0.2, etc.)
    return scaledNum.toFixed(1) + unit.symbol;
  } else {
    return Math.floor(scaledNum) + unit.symbol; // Round down to nearest integer if no significant decimal
  }
}

// Let's analyze YouTube's specific behavior for values like 206982 more closely.
// YouTube often seems to round (not just floor) for numbers like 206,982 -> 207K.
// And for 1,234 -> 1.2K
// For 1,000,000 -> 1M
// For 1,000,000,000 -> 1B
// So, the `toFixed(1)` logic is generally good for the decimal part.

// Let's refine the logic for the example 206982, which YouTube often shows as 207K.
// This indicates simple rounding to the nearest thousand or million.

function formatYouTubeViewCountRefined(num: number): string {
  if (num < 1000) {
    return String(num);
  }

  const thresholds = [
    { value: 1e9, symbol: "B" }, // Billions
    { value: 1e6, symbol: "M" }, // Millions
    { value: 1e3, symbol: "K" }, // Thousands
  ];

  for (const threshold of thresholds) {
    if (num >= threshold.value) {
      const scaled = num / threshold.value;
      // Determine if we need a decimal place:
      // YouTube shows 1.2K, 2.0M, 1M. If the first digit after decimal is 0,
      // they often just show the integer part.
      // A simple check is to see if `scaled * 10` has a non-zero remainder when divided by 10.
      // Or just check if the fractional part is significant.

      // Example: 206,982 -> 206.982K. Round to nearest tenth.
      // 206.982 becomes 207.0. Then, check if it's .0.
      const roundedScaled = Math.round(scaled * 10) / 10; // Round to one decimal place

      // If rounding to one decimal place results in .0, then show without decimals.
      if (roundedScaled % 1 === 0) {
        // Check if it's a whole number after rounding to 1 decimal
        return Math.floor(roundedScaled) + threshold.symbol;
      } else {
        return roundedScaled.toFixed(1) + threshold.symbol;
      }
    }
  }
  return String(num); // Fallback for very small numbers (already handled by first if)
}

/**
 * Converts an ISO 8601 date string to a YouTube-like relative time string.
 * @param isoString The ISO 8601 date string (e.g., "2025-06-16T13:00:13Z").
 * @returns A relative time string (e.g., "2 hours ago", "3 days ago", "1 month ago")
 * or a standard date format if older than a certain threshold.
 */
export function getYouTubePublishedDate(isoString: string): string {
  const publishedDate = new Date(isoString);
  const now = new Date(); // Current time

  const seconds = Math.floor((now.getTime() - publishedDate.getTime()) / 1000);

  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;
  const MONTH = DAY * 30.44; // Average days in a month
  const YEAR = DAY * 365.25; // Average days in a year

  if (seconds < MINUTE) {
    return "just now";
  } else if (seconds < HOUR) {
    const minutes = Math.floor(seconds / MINUTE);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds < DAY) {
    const hours = Math.floor(seconds / HOUR);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (seconds < WEEK) {
    const days = Math.floor(seconds / DAY);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (seconds < MONTH) {
    const weeks = Math.floor(seconds / WEEK);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (seconds < YEAR) {
    const months = Math.floor(seconds / MONTH);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(seconds / YEAR);
    // For very old videos, YouTube typically shows a specific date.
    // Let's use a standard format for dates older than a year.
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return publishedDate.toLocaleDateString("en-US", options);
  }
}

/**
 * Clamps the length of a string to a specified maximum length.
 * If the string's original length exceeds the maxLength, it is truncated
 * and an optional suffix is appended to indicate the truncation.
 *
 * @param text The input string to clamp.
 * @param maxLength The maximum desired length for the string.
 * @param suffix An optional string to append if truncation occurs (e.g., "...").
 * Defaults to '...'. If `maxLength` is too small to accommodate
 * the suffix, the string will simply be truncated without the suffix.
 * @returns The clamped string.
 */
export function clampStringLength(
  text: string,
  maxLength: number = 30,
  suffix: string = "..."
): string {
  // Ensure maxLength is a non-negative number.
  if (maxLength <= 0) {
    return "";
  }

  // If the text is already shorter than or equal to the maxLength, return it as is.
  if (text.length <= maxLength) {
    return text;
  }

  // Calculate the effective length for the content before the suffix.
  // We need to ensure there's enough space for the suffix.
  // If maxLength is smaller than the suffix length, we just truncate without adding the suffix.
  const effectiveMaxLengthForContent = Math.max(0, maxLength - suffix.length);

  // If even after reserving space for the suffix, the effective content length is zero or less,
  // it means the suffix itself is longer or equal to the desired max length.
  // In this case, just truncate the original string to maxLength.
  if (effectiveMaxLengthForContent <= 0) {
    return text.substring(0, maxLength);
  }

  // Truncate the text and append the suffix.
  return text.substring(0, effectiveMaxLengthForContent) + suffix;
}

export function extractSearchType(type: string) {
  return type.split("#")[1];
}
