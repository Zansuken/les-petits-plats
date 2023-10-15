import { store } from ".";

export const useSelector = (selector) => selector(store);

export const currentRouteSelector = (state) => state.route;
export const searchSelector = (state) => state.searchInput;
export const selectedTagsSelector = (state) => state.selectedTags;
export const filteredOptionsSelector = (category) => (state) =>
  state.filteredOptions[category];
export const allDefaultOptionsSelector = (state) => [
  ...state.filteredOptions.ingredients.defaultResult,
  ...state.filteredOptions.appliance.defaultResult,
  ...state.filteredOptions.utensils.defaultResult,
];
export const recipesSelector = (state) => state.recipes;
export const displayedRecipesSelector = (state) => state.displayedRecipes;
