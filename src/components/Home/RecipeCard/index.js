import { build } from "../../../componentBuilder";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";

const styles = {
  root: "bg-white w-96 h-[734px] rounded-3xl overflow-hidden",
};

const RecipeCard = ({ recipe }) => {
  const { root } = styles;
  return build(
    { element: "article", className: root, key: recipe.id },
    CardHeader({
      background: recipe.image,
      recipeTime: recipe.time,
    }),
    CardBody({ recipe: recipe })
  );
};

export default RecipeCard;
