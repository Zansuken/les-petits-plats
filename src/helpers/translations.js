const translations = {
  tags: {
    categoriesLabels: {
      ingredients: "Ingrédients",
      appliance: "Appareils",
      utensils: "Ustensiles",
    },
  },
};

/**
 * Translates a given key by returning the corresponding value from the translations object.
 * If the key does not exist, it logs an error and returns "MISSING_TRANSLATION".
 *
 * @param {string} key - The key to translate, formatted as a string of property names separated by periods (e.g., "tags.categoriesLabels.ingredients").
 * @returns {string} The translated value corresponding to the given key, or "MISSING_TRANSLATION" if the key does not exist.
 * @throws {Error} Will throw an error if a part of the key does not exist in the translations object.
 *
 * @example
 * // returns "Ingrédients"
 * translate("tags.categoriesLabels.ingredients");
 *
 * @example
 * // returns "MISSING_TRANSLATION" and logs an error
 * translate("tags.nonexistentKey");
 */
export const translate = (key) => {
  try {
    const keys = key.split(".");
    return keys.reduce((acc, curr) => {
      if (acc[curr] === undefined) {
        throw new Error(`Key "${curr}" does not exist in translations object`);
      }
      return acc[curr];
    }, translations);
  } catch (error) {
    console.error(error);
    return "MISSING_TRANSLATION";
  }
};
