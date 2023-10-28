import { categories } from "../constants/tags";
import {
  allDefaultOptionsSelector,
  displayedRecipesSelector,
  recipesSelector,
  selectedTagsSelector,
  useSelector,
} from "../store/selectors";
import { removeAccents } from "./common";

/**
 * Converts a tag into an ID by removing accents, converting to lower case, and replacing spaces with underscores.
 *
 * @param {string} tag - The tag to convert.
 * @returns {string} The ID corresponding to the given tag.
 *
 * @example
 * // returns "lait_de_coco"
 * getTagId("Lait de coco");
 */
export const getTagId = (tag) =>
  removeAccents(tag.toLowerCase()).split(" ").join("_");

/**
 * Filters the displayed recipes based on the selected tags.
 *
 * @param {Object[]} allRecipes - The array of all recipes.
 * @param {number[]} displayedRecipes - The array of IDs of the displayed recipes.
 * @returns {Object[]} The filtered array of displayed recipes.
 */
export const getDisplayedRecipes = (allRecipes, displayedRecipes) => {
  const { appliance, utensils, ingredients } =
    useSelector(selectedTagsSelector);

  // Create a map for faster access
  const allRecipesMap = allRecipes.reduce((map, recipe) => {
    map[recipe.id] = recipe;
    return map;
  }, {});

  // Check if there are no tags
  const noTags =
    ingredients.length === 0 && appliance.length === 0 && utensils.length === 0;

  if (noTags) {
    return displayedRecipes.map((id) => allRecipesMap[id]);
  }

  // Helper function to check if tags match
  const isMatchingTags = (tags, recipeTags, getTagIdFunc) => {
    return (
      tags.length === 0 ||
      tags.every(({ id }) => recipeTags.map(getTagIdFunc).includes(id))
    );
  };

  return displayedRecipes
    .filter((id) => {
      const recipe = allRecipesMap[id];

      return (
        isMatchingTags(appliance, [recipe.appliance], getTagId) &&
        isMatchingTags(utensils, recipe.utensils, getTagId) &&
        isMatchingTags(ingredients, recipe.ingredients, (ingredient) =>
          getTagId(ingredient.ingredient)
        )
      );
    })
    .map((id) => allRecipesMap[id]);
};

/**
 * Formats the recipes by returning an array of their IDs.
 *
 * @param {Object[]} recipes - The array of recipes.
 * @returns {number[]} The array of IDs of the given recipes.
 */
export const formatRecipes = (recipes) => recipes.map((recipe) => recipe.id);

/**
 * Filters the default tags by category.
 *
 * @param {Object[]} defaultTags - The array of default tags.
 * @returns {Object[][]} An array containing three arrays of default tags, each array corresponding to a category.
 */
const getDefaultTagsByCategory = (defaultTags) => {
  const filterTagsByCategory = (tagCategory) =>
    defaultTags.filter(({ category }) => category === tagCategory);

  return [
    filterTagsByCategory(categories.INGREDIENTS),
    filterTagsByCategory(categories.APPLIANCE),
    filterTagsByCategory(categories.UTENSILS),
  ];
};

/**
 * Gets the filtered tags from the search.
 *
 * @returns {Object[][]} An array containing three arrays of tags, each array corresponding to a category.
 */
export const getFilteredTagFromSearch = () => {
  const recipes = useSelector(recipesSelector);
  const allDefaultOptions = useSelector(allDefaultOptionsSelector);
  const displayedRecipes = useSelector(displayedRecipesSelector);

  const concernedRecipes = displayedRecipes.map((id) =>
    recipes.find((recipe) => recipe.id === id)
  );

  const [defaultIngredientsTags, defaultAppliancesTags, defaultUtensilsTags] =
    getDefaultTagsByCategory(allDefaultOptions);
  const filteredIngredients = [];
  const filteredAppliances = [];
  const filteredUtensils = [];

  concernedRecipes.forEach(({ ingredients, appliance, utensils }) => {
    ingredients.forEach((ingredient) => {
      if (
        !filteredIngredients.some(
          ({ id }) => getTagId(ingredient.ingredient) === id
        )
      )
        filteredIngredients.push(
          defaultIngredientsTags.find(
            ({ id }) => getTagId(ingredient.ingredient) === id
          )
        );
    });
    if (!filteredAppliances.some(({ id }) => getTagId(appliance) === id))
      filteredAppliances.push(
        defaultAppliancesTags.find(({ id }) => getTagId(appliance) === id)
      );

    utensils.forEach((utensil) => {
      if (!filteredUtensils.some(({ id }) => getTagId(utensil) === id))
        filteredUtensils.push(
          defaultUtensilsTags.find(({ id }) => getTagId(utensil) === id)
        );
    });
  });

  return [
    {
      defaultIngredientsTags,
      filteredIngredients,
    },
    {
      defaultAppliancesTags,
      filteredAppliances,
    },
    {
      defaultUtensilsTags,
      filteredUtensils,
    },
  ];
};
