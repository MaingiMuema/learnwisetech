/**
 * Utility function to get the current year for copyright notices
 * @returns Current year as a number
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Get formatted copyright text with current year
 * @returns Formatted copyright string
 */
export function getCopyrightText(): string {
  return `© ${getCurrentYear()} Learnwise Technologies. All rights reserved.`;
}
