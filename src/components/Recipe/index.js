import { build } from "../../componentBuilder";
import { classNamesBuilder } from "../../helpers/classNames";
import Typography from "../shared/Typography";

const styles = {
  root: "w-full h-full flex",
  notFound: "justify-center items-center text-3xl",
};

const RecipeContent = ({ concernedRecipe, paramId }) => {
  const { root, notFound } = styles;

  if (!concernedRecipe?.name) {
    return build(
      {
        element: "div",
        className: classNamesBuilder([
          { className: root },
          { className: notFound },
        ]),
      },
      Typography({
        variant: "h1",
        value: `Recipe with id: ${paramId} doesn't exist!`,
      })
    );
  }

  return build(
    { element: "div", className: classNamesBuilder([{ className: root }]) },
    build(
      { element: "span" },
      `Recipe ${concernedRecipe?.name ?? `with id: ${paramId} doesn't exist!`}`
    )
  );
};

export default RecipeContent;
