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
 * @property {string[]} ustensils - The utensils used to make the recipe.
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

  for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
    const recipe = recipes[recipeIndex];
    const { id: recipeId, name, description, ingredients } = recipe;

    if (newRecipes.includes(recipeId)) continue;

    if (formatValue(name).includes(formattedSearch)) {
      newRecipes.push(recipeId);

      continue;
    }

    if (formatValue(description).includes(formattedSearch)) {
      newRecipes.push(recipeId);

      continue;
    }

    for (
      let ingredientIndex = 0;
      ingredientIndex < ingredients.length;
      ingredientIndex++
    ) {
      const { ingredient: ingredientName } = ingredients[ingredientIndex];

      if (formatValue(ingredientName).includes(formattedSearch)) {
        newRecipes.push(recipeId);

        break;
      }
    }
  }

  return newRecipes;
};
