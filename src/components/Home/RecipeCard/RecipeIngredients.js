import { build } from "../../../componentBuilder";
import Typography from "../../shared/Typography";
import Ingredient from "./Ingredient";

const styles = {
  root: "flex flex-col gap-4",
  subtitle: "text-xs text-grey font-bold",
  content: "grid grid-cols-2 gap-5",
};

const RecipeIngredients = ({ ingredients }) => {
  const { root, subtitle, content } = styles;

  const Ingredients = ingredients.map(({ ingredient, quantity, unit }) => {
    return Ingredient({ ingredient, quantity, unit });
  });
  return build(
    { element: "section", className: root },
    Typography({ variant: "h6", value: "INGRÉDIENTS", className: subtitle }),
    build({ element: "div", className: content }, ...Ingredients)
  );
};

export default RecipeIngredients;
