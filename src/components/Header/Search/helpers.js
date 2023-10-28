import { removeAccents } from "../../../helpers/common";

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
 * @property {string[]} utensils - The utensils used to make the recipe.
 */

const formatValue = (string) => removeAccents(string.toLowerCase());

/**
 *
 * @param {Recipe[]} recipes
 * @param {string} search
 */
export const filterRecipe = (recipes, search) => {
  const newRecipes = [];
  const formattedSearch = formatValue(search);

  recipes.forEach(({ name, ingredients, description, id }) => {
    if (
      formatValue(name).includes(formattedSearch) ||
      formatValue(description).includes(formattedSearch) ||
      ingredients.some(({ ingredient }) =>
        formatValue(ingredient).includes(formattedSearch)
      )
    ) {
      newRecipes.push(id);
    }
  });

  return newRecipes;
};
