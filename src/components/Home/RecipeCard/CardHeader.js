import { build } from "../../../componentBuilder";
import Chip from "../../shared/Chip";

const styles = {
  root: "w-full h-64 relative",
  backgroundImg: "object-cover object-center w-full h-full",
  chip: "absolute top-5 right-5",
};

const CardHeader = (
  { background, recipeTime } = {
    background: "/assets/images/recipes/Recette01.webp",
    recipeTime: 0,
  }
) => {
  const { root, backgroundImg, chip } = styles;
  return build(
    { element: "div", className: root },
    build({
      element: "img",
      className: backgroundImg,
      src: `/assets/images/recipes/${background}`,
      loading: "lazy",
      placeholder: "/assets/images/placeholder.webp",
    }),
    Chip({ label: `${recipeTime}min`, className: chip })
  );
};

export default CardHeader;
