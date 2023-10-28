import { build } from "../../../componentBuilder";
import Typography from "../../shared/Typography";
import RecipeDescription from "./RecipeDescription";
import RecipeIngredients from "./RecipeIngredients";

const styles = {
  root: "pt-8 px-6 flex gap-8 flex-col flex-1",
  title: "font-title text-[18px]",
};

const CardBody = ({ recipe }) => {
  const { root, title } = styles;
  const { name, description, ingredients } = recipe;

  return build(
    { element: "div", className: root },
    Typography({
      variant: "h4",
      value: name,
      className: title,
    }),
    RecipeDescription({
      description: description,
    }),
    RecipeIngredients({ ingredients })
  );
};

export default CardBody;
