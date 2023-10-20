import { build } from "../../componentBuilder";
import { dispatch } from "../../store";
import { setDisplayedRecipes, setRecipes } from "../../store/actions";
import {
  displayedRecipesSelector,
  recipesSelector,
  useSelector,
} from "../../store/selectors";
import RecipeCard from "./RecipeCard";
import recipesData from "../../../database/recipes.js";
import { getParams } from "../../router/helpers";
import { filterRecipe } from "../Header/Search/helpers.js";

const styles = {
  root: "w-full pt-14 flex flex-wrap justify-center gap-12",
};

const formatRecipes = (recipes) => recipes.map((recipe) => recipe.id);

dispatch(setRecipes(recipesData));

const searchParams = getParams().find(({ name }) => name === "search");

dispatch(
  setDisplayedRecipes(
    searchParams
      ? filterRecipe(recipesData, searchParams.value)
      : formatRecipes(recipesData)
  )
);

const HomeContent = () => {
  const { root } = styles;

  const allRecipes = useSelector(recipesSelector);
  const displayedRecipes = useSelector(displayedRecipesSelector);

  const currentRecipes = allRecipes.filter(({ id }) =>
    displayedRecipes.includes(id)
  );

  return build(
    { element: "div", className: root },
    ...currentRecipes.map((recipe) => RecipeCard({ recipe }))
  );
};

export default HomeContent;