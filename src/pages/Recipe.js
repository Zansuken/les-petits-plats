import { build } from "../componentBuilder";
import RecipeContent from "../components/Recipe";

const styles = {
  root: "py-5 px-24 w-full flex-1 bg-bg-grey",
};

const Recipe = ({ concernedRecipe, paramId }) => {
  return build(
    {
      element: "main",
      className: styles.root,
    },
    RecipeContent({ concernedRecipe, paramId })
  );
};

export default Recipe;
