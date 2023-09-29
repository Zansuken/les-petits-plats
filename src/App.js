import { build, updateView } from "./componentBuilder";
import Button from "./components/shared/Button";
import { store } from "./store";
// eslint-disable-next-line no-unused-vars
import { Component } from "./types";

/**
 * The App component.
 * @returns {Component} The virtual DOM node representing the App component.
 */
const App = () => {
  const count = store.getCount();

  const updateCount = () => {
    const oldCount = store.getCount();
    updateView(() => store.onUpdateCount(oldCount + 1));
  };

  return build(
    "div",
    { id: "app" },
    build(
      "div",
      { class: "flex flex-col items-center gap-4" },
      build(
        "span",
        { id: "count", class: "text-6xl font-title" },
        "Count: " + count
      ),
      Button({ label: "Increment", onclick: updateCount })
    )
  );
};

export default App;
