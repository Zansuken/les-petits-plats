import { build } from "./componentBuilder";
import Header from "./components/Header";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import { getParams } from "./router/helpers";
import routes from "./router/routes";
import { dispatch } from "./store";
import { setCurrentRoute } from "./store/actions";
import {
  currentRouteSelector,
  recipesSelector,
  useSelector,
} from "./store/selectors";
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

  if (window.location.pathname.includes(routes.HOME)) {
    if (!currentRoute.includes(routes.HOME)) {
      if (currentParams.length > 0) {
        dispatch(
          setCurrentRoute({ route: routes.HOME, params: currentParams })
        );
      } else {
        dispatch(setCurrentRoute({ route: routes.HOME }));
      }
    }
  }

  if (window.location.pathname.includes(routes.RECIPE)) {
    dispatch(setCurrentRoute({ route: window.location.pathname }));
  }

  const route = useSelector(currentRouteSelector);
  const paramId = route.split("/")[2];
  const allRecipes = useSelector(recipesSelector);
  const concernedRecipe = allRecipes.find(
    (recipe) => recipe.id.toString() === paramId
  );

  const getPage = () => {
    if (window.location.pathname.includes(routes.HOME)) return Home();
    if (window.location.pathname.includes(routes.RECIPE))
      return Recipe({ concernedRecipe, paramId });
  };

  return build(
    {
      element: "div",
      id: "app",
      className: styles.root,
    },
    Header({ background: concernedRecipe?.image }),
    getPage()
  );
};

export default App;
