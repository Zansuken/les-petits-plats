import { removeAccents } from "./common";

const formatTag = (tag) =>
  removeAccents(tag.toLowerCase()).split(" ").join("_");

const matchingAppliances = (tags, recipes) =>
  recipes
    .filter(({ appliance }) => tags.includes(formatTag(appliance)))
    .map(({ id }) => id);

const matchingUtensils = (tags, recipes) =>
  recipes
    .filter(({ ustensils }) => {
      const formattedUtensils = ustensils.map((utensil) =>
        removeAccents(formatTag(utensil))
      );
      return formattedUtensils.some((utensil) => tags.includes(utensil));
    })
    .map(({ id }) => id);

const matchingIngredients = (tags, recipes) =>
  recipes
    .filter(({ ingredients }) => {
      const formattedIngredients = ingredients.map(({ ingredient }) =>
        removeAccents(formatTag(ingredient))
      );
      return formattedIngredients.some((ingredient) =>
        tags.includes(ingredient)
      );
    })
    .map(({ id }) => id);

export const getDisplayedRecipes = (
  allRecipes,
  displayedRecipes,
  ingredients,
  appliance,
  utensils
) =>
  allRecipes.filter(({ id }) => {
    if (
      ingredients.length === 0 &&
      appliance.length === 0 &&
      utensils.length === 0
    )
      return displayedRecipes.includes(id);

    const currentMatchingTags = new Set([]);

    if (appliance.length > 0) {
      matchingAppliances(
        appliance.map(({ id }) => id),
        allRecipes
      ).forEach((item) => currentMatchingTags.add(item));
    }
    if (utensils.length > 0) {
      matchingUtensils(
        utensils.map(({ id }) => id),
        allRecipes
      ).forEach((item) => currentMatchingTags.add(item));
    }
    if (ingredients.length > 0) {
      matchingIngredients(
        ingredients.map(({ id }) => id),
        allRecipes
      ).forEach((item) => currentMatchingTags.add(item));
    }

    return Array.from(currentMatchingTags).includes(id);
  });

export const formatRecipes = (recipes) => recipes.map((recipe) => recipe.id);
