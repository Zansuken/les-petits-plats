import { build } from "./componentBuilder";
import Header from "./components/Header";
import Home from "./pages/Home";
import { getParams } from "./router/helpers";
import routes from "./router/routes";
import { dispatch } from "./store";
import { setCurrentRoute } from "./store/actions";
import { currentRouteSelector, useSelector } from "./store/selectors";
// eslint-disable-next-line no-unused-vars
import { ComponentType } from "./types";

const styles = {
  root: "flex flex-col items-center justify-start w-screen h-screen font-default overflow-x-hidden scroll-smooth",
};

/**
 * The App component.
 * @returns {ComponentType} The virtual DOM node representing the App component.
 */
const App = () => {
  const currentParams = getParams();
  const currentRoute = useSelector(currentRouteSelector);

  if (!currentRoute.includes(routes.HOME)) {
    if (currentParams.length > 0) {
      dispatch(setCurrentRoute({ route: routes.HOME, params: currentParams }));
    } else {
      dispatch(setCurrentRoute({ route: routes.HOME }));
    }
  }

  const getPage = () => {
    if (currentRoute.includes(routes.HOME)) return Home();
  };

  return build(
    {
      element: "div",
      id: "app",
      className: styles.root,
    },
    Header(),
    getPage()
  );
};

export default App;
