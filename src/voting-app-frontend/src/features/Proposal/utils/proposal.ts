// Utility functions for proposal routing and URL generation

/**
 * Convert proposal title to URL-friendly format
 * @param {string} title - The proposal title
 * @returns {string} URL-friendly string
 */
export const titleToUrlSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
};

/**
 * Convert URL slug back to title format
 * @param {string} slug - URL slug
 * @returns {string} Title format
 */
export const urlSlugToTitle = (slug: string): string => {
  return slug
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    ); // Capitalize first letter of each word
};

/**
 * Generate proposal detail URL
 * @param {string} username - Author username
 * @param {string} proposalTitle - Proposal title
 * @returns {string} Complete URL path
 */
export const generateProposalUrl = (
  username: string,
  proposalTitle: string
): string => {
  const urlSlug = titleToUrlSlug(proposalTitle);
  return `/proposal/${username}/${urlSlug}`;
};

/**
 * Navigate to proposal detail page
 * @param {function} navigate - React Router navigate function
 * @param {string} username - Author username
 * @param {string} proposalTitle - Proposal title
 */
export const navigateToProposal = (
  navigate: Function,
  username: string,
  proposalTitle: string
) => {
  const url = generateProposalUrl(username, proposalTitle);
  navigate(url);
};

/**
 * Format username for URL (remove special characters)
 * @param {string} username - Original username
 * @returns {string} URL-safe username
 */
export const formatUsernameForUrl = (username: string): string => {
  return username
    .toLowerCase()
    .replace(/[^\w-]/g, "") // Remove special characters except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
};
