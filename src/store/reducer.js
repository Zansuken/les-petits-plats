/* eslint-disable no-case-declarations */
import { updateStore } from ".";
import {
  addParams,
  updateParamArrayValue,
  updateRoute,
} from "../router/helpers";
import routes from "../router/routes";
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
import {
  addTagToStore,
  removeTagFromStore,
  updateFilteredOptions,
} from "./helpers";

const initialFilteredOption = {
  defaultResult: [],
  result: [],
};

export const initialState = {
  route: routes.HOME,
  searchInput: "",
  selectedTags: {
    ingredients: [],
    appliance: [],
    utensils: [],
  },
  filteredOptions: {},
  recipes: [],
  displayedRecipes: [],
};

export const reducer = ({ type, payload }, state = initialState) => {
  switch (type) {
    case SET_CURRENT_ROUTE:
      if ("params" in payload) {
        addParams(payload.params);

        const newURL = `${window.location.pathname}?${payload.params
          .map((param) => `${param.name}=${param.value.toString()}`)
          .join("&")}`;
        updateStore({ ...state, route: newURL });
        updateRoute(newURL);
      } else {
        updateStore({ ...state, route: payload.route });
        updateRoute(payload.route);
      }

      break;

    case SET_SEARCH_INPUT:
      updateStore({ ...state, searchInput: payload });

      break;

    case SET_SELECTED_TAGS:
      if ("tags" in payload) {
        updateStore({
          ...state,
          selectedTags: {
            ...state.selectedTags,
            [payload.category]: payload.tags,
          },
        });
      } else {
        updateStore({
          ...state,
          selectedTags: {
            ...state.selectedTags,
            [payload.category]: Array.from(
              new Set([...state.selectedTags[payload.category], ...payload])
            ),
          },
        });
      }

      break;

    case ADD_SELECTED_TAG:
      updateStore({
        ...state,
        selectedTags: {
          ...state.selectedTags,
          [payload.category]: addTagToStore(
            state.selectedTags[payload.category],
            payload
          ),
        },
      });

      updateParamArrayValue({
        name: payload.category,
        array: addTagToStore(state.selectedTags[payload.category], payload),
      });

      break;

    case REMOVE_SELECTED_TAG:
      updateStore({
        ...state,
        selectedTags: {
          ...state.selectedTags,
          [payload.category]: removeTagFromStore(
            state.selectedTags[payload.category],
            payload
          ),
        },
      });

      updateParamArrayValue({
        name: payload.category,
        array: removeTagFromStore(
          state.selectedTags[payload.category],
          payload
        ),
      });

      break;

    case RESET_SELECTED_TAGS:
      updateStore({ ...state, selectedTags: initialState.selectedTags });

      break;

    case SET_DEFAULT_OPTIONS:
      updateStore({
        ...state,
        filteredOptions: updateFilteredOptions({
          state,
          payload,
          initialFilteredOption,
          optionKey: "defaultResult",
        }),
      });

      break;

    case SET_FILTERED_OPTIONS:
      const { category, result, defaultResult } = payload;

      updateStore({
        ...state,
        filteredOptions: {
          ...state.filteredOptions,
          [category]: {
            defaultResult,
            ...(result.length > 0 ? { result } : {}),
          },
        },
      });

      break;

    case SET_RECIPES:
      updateStore({
        ...state,
        recipes: payload,
      });

      break;

    case SET_DISPLAYED_RECIPES:
      updateStore({
        ...state,
        displayedRecipes: payload,
      });

      break;

    case RESET_DISPLAYED_RECIPES:
      updateStore({
        ...state,
        displayedRecipes: state.recipes.map(({ id }) => id),
      });

      break;

    default:
      break;
  }
};
