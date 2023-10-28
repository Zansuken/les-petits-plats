import { build } from "./componentBuilder";
import Header from "./components/Header";
import Home from "./pages/Home";
import { getParams } from "./router/helpers";
import routes from "./router/routes";
import { dispatch } from "./store";
import { setCurrentRoute, setSearchInput } from "./store/actions";
import {
  currentRouteSelector,
  recipesSelector,
  searchSelector,
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
  const searchInput = () => useSelector(searchSelector);

  if (window.location.pathname.includes(routes.HOME)) {
    const searchParam = currentParams?.find(({ name }) => name === "search");

    if (searchParam && searchInput() !== searchParam.value) {
      dispatch(setSearchInput(searchParam.value));
    }

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

  const route = useSelector(currentRouteSelector);
  const paramId = route.split("/")[2];
  const allRecipes = useSelector(recipesSelector);
  const concernedRecipe = allRecipes.find(
    (recipe) => recipe.id.toString() === paramId
  );

  return build(
    {
      element: "div",
      id: "app",
      className: styles.root,
    },
    Header({ background: concernedRecipe?.image }),
    Home()
  );
};

export default App;
