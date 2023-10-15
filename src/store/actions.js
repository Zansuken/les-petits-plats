import {
  ADD_SELECTED_TAG,
  REMOVE_SELECTED_TAG,
  RESET_DISPLAYED_RECIPES,
  RESET_SELECTED_TAGS,
  SET_CURRENT_ROUTE,
  SET_DEFAULT_OPTIONS,
  SET_DISPLAYED_RECIPES,
  SET_FILTERED_OPTIONS,
  SET_RECIPES,
  SET_SEARCH_INPUT,
  SET_SELECTED_TAGS,
} from "./constants";

/**
 * @param {Object} payload
 * @param {string} payload.route - The new route.
 * @param {[{}]} [payload.params] - The new route params.
 * @returns {void}
 */
export const setCurrentRoute = (payload) => ({
  type: SET_CURRENT_ROUTE,
  payload,
});

/**
 * @param {string} payload - The user search.
 * @returns {void}
 */
export const setSearchInput = (payload) => ({
  type: SET_SEARCH_INPUT,
  payload,
});

/**
 * @param {Object} payload
 * @param {string} payload.category - The tag category.
 * @param {object[]} payload.tags - The tags.
 * @returns {void}
 */
export const setSelectedTags = (payload) => ({
  type: SET_SELECTED_TAGS,
  payload,
});

/**
 * @param {Object} payload
 * @param {string} payload.category - The tag category.
 * @param {string} payload.id - The tag id.
 * @returns {void}
 */
export const addSelectedTag = (payload) => ({
  type: ADD_SELECTED_TAG,
  payload,
});

/**
 * @param {Object} payload
 * @param {string} payload.category - The tag category.
 * @param {string} payload.id - The tag id.
 * @returns {void}
 */
export const removeSelectedTag = (payload) => ({
  type: REMOVE_SELECTED_TAG,
  payload,
});

export const resetSelectedTags = () => ({
  type: RESET_SELECTED_TAGS,
});

/**
 * @param {Object} payload
 * @param {object[]} payload.category - The option's default results.
 * @returns {void}
 */
export const setDefaultOptions = (payload) => ({
  type: SET_DEFAULT_OPTIONS,
  payload,
});

/**
 * @param {Object} payload
 * @param {string} payload.category - The option's category.
 * @param {object[]} payload.defaultResult - The option's default results.
 * @param {object[]} payload.result - The option's displayed results.
 * @returns {void}
 */
export const setFilteredOptions = (payload) => ({
  type: SET_FILTERED_OPTIONS,
  payload,
});

/**
 * @param {object[]} payload - An array of recipes objects.
 * @returns {void}
 */
export const setRecipes = (payload) => ({
  type: SET_RECIPES,
  payload,
});

/**
 * @param {number[]} payload - An array of recipes ids.
 * @returns {void}
 */
export const setDisplayedRecipes = (payload) => ({
  type: SET_DISPLAYED_RECIPES,
  payload,
});

export const resetDisplayedRecipes = () => ({
  type: RESET_DISPLAYED_RECIPES,
});
