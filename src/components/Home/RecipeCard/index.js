import { build } from "../../../componentBuilder";
import { resetParams } from "../../../router/helpers";
import routes from "../../../router/routes";
import { dispatch } from "../../../store";
import { resetSelectedTags, setCurrentRoute } from "../../../store/actions";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";

const styles = {
  root: "bg-white w-96 h-[734px] rounded-3xl overflow-hidden drop-shadow-2xl animate-fadeIn hover:cursor-pointer",
};

const RecipeCard = ({ recipe }) => {
  const { root } = styles;

  const onClickCard = () => {
    dispatch(setCurrentRoute({ route: `${routes.RECIPE}/${recipe.id}` }));
    dispatch(resetSelectedTags());
    resetParams();
    window.location.reload();
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
