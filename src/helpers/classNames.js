/**
 * @typedef {Object} ClassName
 * @property {string} value
 * @property {boolean} isUsed
 */

/**
 *
 * @param {ClassName[]} classNames
 * @returns {string} - classNames
 */
const classNamesBuilder = (classNames = []) => {
  const currentClassNames = Array.from(new Set(classNames))
    .filter(({ isUsed }) => isUsed)
    .map(({ value }) => value);

  return currentClassNames.join(" ");
};

export default classNamesBuilder;
