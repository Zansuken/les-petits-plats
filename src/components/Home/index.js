import { build } from "../../componentBuilder";
import { dispatch } from "../../store";
import { setDisplayedRecipes, setRecipes } from "../../store/actions";
import RecipeCard from "./RecipeCard";
import recipesData from "../../../database/recipes.js";
import { getParams } from "../../router/helpers";
import { filterRecipe } from "../Header/Search/helpers.js";
import { formatRecipes } from "../../helpers/dataHelpers";

const styles = {
  root: "w-full pt-14 flex flex-wrap justify-center gap-12",
};

dispatch(setRecipes(recipesData));

const searchParams = getParams().find(({ name }) => name === "search");

dispatch(
  setDisplayedRecipes(
    searchParams
      ? filterRecipe(recipesData, searchParams.value)
      : formatRecipes(recipesData)
  )
);

const HomeContent = ({ currentRecipes }) =>
  build(
    { element: "div", className: styles.root },
    ...currentRecipes.map((recipe) => RecipeCard({ recipe }))
  );

export default HomeContent;
