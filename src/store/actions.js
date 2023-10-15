import {
  ADD_SELECTED_TAG,
  REMOVE_SELECTED_TAG,
  RESET_SELECTED_TAGS,
  SET_CURRENT_ROUTE,
  SET_DEFAULT_OPTIONS,
  SET_DISPLAYED_RECIPES,
  SET_FILTERED_OPTIONS,
  SET_RECIPES,
  SET_SEARCH_INPUT,
  SET_SELECTED_TAGS,
} from "./constants";

export const setCurrentRoute = (payload) => ({
  type: SET_CURRENT_ROUTE,
  payload,
});

export const setSearchInput = (payload) => ({
  type: SET_SEARCH_INPUT,
  payload,
});

export const setSelectedTags = (payload) => ({
  type: SET_SELECTED_TAGS,
  payload,
});

export const addSelectedTag = (payload) => ({
  type: ADD_SELECTED_TAG,
  payload,
});

export const removeSelectedTag = (payload) => ({
  type: REMOVE_SELECTED_TAG,
  payload,
});

export const resetSelectedTags = () => ({
  type: RESET_SELECTED_TAGS,
});

export const setDefaultOptions = (payload) => ({
  type: SET_DEFAULT_OPTIONS,
  payload,
});

export const setFilteredOptions = (payload) => ({
  type: SET_FILTERED_OPTIONS,
  payload,
});

export const setRecipes = (payload) => ({
  type: SET_RECIPES,
  payload,
});

export const setDisplayedRecipes = (payload) => ({
  type: SET_DISPLAYED_RECIPES,
  payload,
});
