import { updateStore } from ".";
import { addParams, updateRoute } from "../router/helpers";
import routes from "../router/routes";
import {
  RESET_SELECTED_TAGS,
  SET_CURRENT_ROUTE,
  SET_DEFAULT_OPTIONS,
  SET_FILTERED_OPTIONS,
  SET_SEARCH_INPUT,
  SET_SELECTED_TAGS,
} from "./constants";
import { updateFilteredOptions } from "./helpers";

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

    case RESET_SELECTED_TAGS:
      updateStore({ ...state, selectedTags: initialState.selectedTags });

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
      // eslint-disable-next-line no-case-declarations
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

    default:
      break;
  }
};
