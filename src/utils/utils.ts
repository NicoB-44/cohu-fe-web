export const formatDate = (iso: string, region: string) => {
  return new Date(iso).toLocaleDateString(region);
};

export const formatDuration = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "-";

  // Less than a minute
  if (seconds < 60) {
    return "1 minute";
  }

  // ~ X minutes (5-minute rounding)
  if (seconds < 3300) { // up to ~55 minutes
    const mins = Math.trunc(seconds / (60 * 5)) + 1; // step of 5
    return `~ ${mins * 5} minutes`;
  }

  // ~ X hours
  if (seconds < 82800) { // up to ~23 hours
    const hours = Math.trunc(seconds / 3600) + 1;
    return `~ ${hours} hour${hours > 1 ? "s" : ""}`;
  }

  const days = Math.trunc(seconds / (3600 * 24)) + 1;
  return `~ ${days} day${days > 1 ? "s" : ""}`;

  // Months are to imprecise  
  // ~ X months (approx. 30 days per month)
  // const months = Math.trunc(seconds / (3600 * 24 * 30)) + 1;
  // return `~ ${months} month${months > 1 ? "s" : ""}`;
};