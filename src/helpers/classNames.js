/**
 * @typedef {Object} ClassName
 * @property {string} className
 * @property {boolean} isUsed
 */

/**
 *
 * @param {ClassName[]} classNames
 * @returns {string} - classNames
 */
const classNamesBuilder = (classNames = []) => {
  const currentClassNames = Array.from(new Set(classNames))
    .filter(({ isUsed }) => (isUsed === undefined ? true : isUsed))
    .map(({ className }) => className);

  return currentClassNames.join(" ");
};

export default classNamesBuilder;
