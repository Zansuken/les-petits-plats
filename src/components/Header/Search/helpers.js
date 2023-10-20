/**
 * @typedef {Object} Recipe
 * @property {number} id - The recipe's ID.
 * @property {string} image - The recipe's image filename.
 * @property {string} name - The recipe's name.
 * @property {number} servings - The number of servings the recipe makes.
 * @property {Array.<{ingredient: string, quantity?: number, unit?: string}>} ingredients - The ingredients for the recipe.
 * @property {number} time - The time it takes to prepare the recipe.
 * @property {string} description - The recipe's description.
 * @property {string} appliance - The appliance used to make the recipe.
 * @property {string[]} ustensils - The utensils used to make the recipe.
 */

/**
 *
 * @param {Recipe[]} recipes
 * @param {string} search
 */
export const filterRecipe = (recipes, search) => {
  const newRecipes = recipes;
  console.log(search);

  console.log(
    "%cNOT YET IMPLEMENTED",
    "color: #000000; background-color: #FFE53C; border-radius: 4px; padding: 2px 4px;",
    search
  );

  // TODO: Update this file with the search recipes algorithm.

  return newRecipes;
};
