import { store } from ".";

export const useSelector = (selector) => selector(store);

export const currentRouteSelector = (state) => state.route;
export const searchSelector = (state) => state.searchInput;
export const selectedTagsSelector = (state) => state.selectedTags;
export const filteredOptionsSelector = (category) => (state) =>
  state.filteredOptions[category];
