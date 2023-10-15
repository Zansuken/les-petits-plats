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
export const classNamesBuilder = (classNames = []) => {
  const currentClassNames = Array.from(new Set(classNames))
    .filter(({ isUsed }) => (isUsed === undefined ? true : isUsed))
    .map(({ className }) => className);

  return currentClassNames.join(" ");
};

export const splitClassNames = (className) => className?.split(" ");
export const joinClassNames = (className) => className?.join(" ");

export const isContainingClassName = (currentClassNames, newClassNames) => {
  return splitClassNames(newClassNames).some((newClassName) =>
    currentClassNames.includes(newClassName)
  );
};

export const mergeClassNames = (currentClassNames, newClassNames) => {
  if (!Array.isArray(currentClassNames) || !Array.isArray(newClassNames))
    return;
  if (!isContainingClassName(currentClassNames, newClassNames)) {
    const mergedClassNames = splitClassNames(currentClassNames);

    splitClassNames(newClassNames).forEach((newClassName) =>
      mergedClassNames.push(newClassName)
    );

    return joinClassNames(mergedClassNames);
  }
};
