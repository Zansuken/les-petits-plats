import { build, updateView } from "../../../componentBuilder";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";

const styles = {
  root: "bg-white w-96 h-[734px] rounded-3xl overflow-hidden drop-shadow-2xl animate-fadeIn hover:cursor-pointer",
};

const RecipeCard = ({ recipe }) => {
  const { root } = styles;

  const onClickCard = () => {
    console.log("Card clicked");
    updateView();
  };

  return build(
    {
      element: "article",
      className: root,
      key: `recipe-card_${recipe.id}`,
      onClick: onClickCard,
      onkeydown: ({ key } = { key: "" }) => key === "Enter" && onClickCard(),
      tabindex: 0,
    },
    CardHeader({
      background: recipe.image,
      recipeTime: recipe.time,
    }),
    CardBody({ recipe: recipe })
  );
};

export default RecipeCard;
