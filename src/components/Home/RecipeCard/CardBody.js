import { build } from "../../../componentBuilder";
import { searchSelector, useSelector } from "../../../store/selectors";
import Typography from "../../shared/Typography";
import RecipeDescription from "./RecipeDescription";
import RecipeIngredients from "./RecipeIngredients";

const styles = {
  root: "pt-8 px-6 flex gap-8 flex-col",
  title: "font-title text-[18px]",
};

const CardBody = ({ recipe }) => {
  const searchInput = () => useSelector(searchSelector);
  const { root, title } = styles;
  const { name, description, ingredients } = recipe;

  return build(
    { element: "div", className: root },
    Typography({
      variant: "h4",
      value: name,
      className: title,
      currentSearch: searchInput(),
    }),
    RecipeDescription({
      description: description,
      currentSearch: searchInput(),
    }),
    RecipeIngredients({ ingredients, currentSearch: searchInput() })
  );
};

export default CardBody;
