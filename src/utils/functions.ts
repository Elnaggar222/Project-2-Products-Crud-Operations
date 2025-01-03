/**
 * Description placeholder
 *
 * @param {string} txt - txt to slice
 * @param {number} [max=70] - max length of needed txt
 * @returns {string} - returned sliced txt
 */
export const txtSlicer = (txt: string, max: number = 40) => {
  if (txt.length > max) return txt.slice(0, max) + "...";
  return txt;
};

/**
 * Formats a number string by adding commas as thousand separators.
 *
 * @param {string} price - The price string to format (e.g., "550000")
 * @returns {string} - The formatted price string with commas (e.g., "550,000")
 */
export const formatPriceWithCommas = (price: string): string => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
