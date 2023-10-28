import { build, updateView } from "../../../componentBuilder";
import { classNamesBuilder } from "../../../helpers/classNames";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";

const styles = {
  root: "bg-white w-96 h-[734px] rounded-3xl overflow-hidden drop-shadow-2xl animate-fadeIn hover:cursor-pointer",
  cardModal:
    "absolute left-0 right-0 top-0 bottom-0 m-auto z-50 h-[80%] w-[80%] flex flex-col shadow-[0_35px_100px_160px_rgba(0,0,0,0.5)]",
};

let isCardModalOpen = {
  id: null,
  isDisplayed: false,
};

const RecipeCard = ({ recipe }) => {
  const { root, cardModal } = styles;

  const onClickCard = () => {
    isCardModalOpen = {
      id: recipe.id,
      isDisplayed: !isCardModalOpen.isDisplayed,
    };
    updateView();
  };

  return build(
    {
      element: "article",
      className: classNamesBuilder([
        { className: root },
        {
          className: cardModal,
          isUsed:
            isCardModalOpen.isDisplayed && isCardModalOpen.id === recipe.id,
        },
      ]),
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
