import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  differenceInSeconds,
} from "date-fns";

export const getDeltaTime = (commentDate: Date) => {
  const now = new Date();

  const seconds = differenceInSeconds(now, commentDate);
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = differenceInMinutes(now, commentDate);
  if (minutes < 60) {
    return `${minutes}mi`;
  }

  const hours = differenceInHours(now, commentDate);
  if (hours < 24) {
    return `${hours}h`;
  }

  const days = differenceInDays(now, commentDate);
  if (days < 7) {
    return `${days}d`;
  }

  const weeks = differenceInWeeks(now, commentDate);
  if (weeks < 4) {
    return `${weeks}w`;
  }

  const months = differenceInMonths(now, commentDate);
  if (months < 12) {
    return `${months}m`;
  }

  const years = differenceInYears(now, commentDate);
  return `${years}y`;
};
