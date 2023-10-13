export const generateUniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

export const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const removeAccents = (string) =>
  string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/**
 * Checks if two virtual DOM nodes are different.
 * @param {object|string} node1 - The first virtual DOM node.
 * @param {object|string} node2 - The second virtual DOM node.
 * @returns {boolean} True if the nodes are different, false otherwise.
 */
export const isNodeDiff = (newNode, oldNode) =>
  JSON.stringify(newNode) !== JSON.stringify(oldNode);
