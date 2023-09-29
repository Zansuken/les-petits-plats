import { build } from "./componentBuilder";
import Header from "./components/Header";
import Home from "./pages/Home";
import routes from "./router/routes";
import { store } from "./store";
// eslint-disable-next-line no-unused-vars
import { Component } from "./types";

/**
 * The App component.
 * @returns {Component} The virtual DOM node representing the App component.
 */
const App = () => {
  store.setRoute(routes.HOME);

  const currentRoute = store.getRoute();

  const getPage = () => {
    switch (currentRoute) {
      case routes.HOME:
        return Home();

      default:
        break;
    }
  };

  return build(
    "div",
    {
      id: "app",
      class: "flex flex-col items-center justify-start w-screen h-screen",
    },
    Header(),
    getPage()
  );
};

export default App;
