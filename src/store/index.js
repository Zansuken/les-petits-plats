import { reducer, initialState } from "./reducer";

export let store = { ...initialState };

export const updateStore = (newState) => {
  store = newState;
  if (typeof console !== "undefined" && console.clear) {
    console.log(
      "%cStore",
      "color: #3B4421; background-color: #bada55; border-radius: 4px; padding: 2px 4px;",
      newState
    );
    console.log(
      "%c---------------------------------------------------------",
      "color: #bada55"
    );
  }
};

export const dispatch = (action) => {
  reducer(action, store);
  if (typeof console !== "undefined" && console.clear) {
    console.log(
      "%caction",
      "color: #FFFFF1; background-color: #BA2929; border-radius: 4px; padding: 2px 4px;",
      action.type
    );
    console.log(
      "%c---------------------------------------------------------",
      "color: #BA2929"
    );
    console.log(
      "%cpayload",
      "color: #8BD5A8; background-color: #194FA1; border-radius: 4px; padding: 2px 4px;",
      action.payload
    );
    console.log(
      "%c---------------------------------------------------------",
      "color: #194FA1"
    );
  }
};
