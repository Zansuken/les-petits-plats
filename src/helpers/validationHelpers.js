/**
 *
 * @param {Node} node - Any node
 * @returns {boolean} - True if node is an instance of Node
 */
export const isNode = (node) => node instanceof Node;

/**
 *
 * @param {string} string - Any string
 * @returns {boolean} - True if string is a string
 */
export const isString = (string) => typeof string === "string";

/**
 *
 * @param {number} number - Any number
 * @returns {boolean} - True if number is a number
 */
export const isNumber = (number) => typeof number === "number";

export const sanitizeInput = (input) => {
  const map = {
    "&": "",
    "<": "",
    ">": "",
    '"': "",
    "'": "",
  };

  return input.replace(/[&<>"']/g, (m) => {
    return map[m];
  });
};
