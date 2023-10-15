import { build } from "../../../componentBuilder";
import Typography from "../../shared/Typography";

const styles = {
  root: "flex flex-col gap-4",
  subtitle: "text-xs text-grey font-bold",
  content: "text-sm text-ellipsis line-clamp-4",
};

const RecipeDescription = ({ description }) => {
  const { root, subtitle, content } = styles;
  return build(
    { element: "section", className: root },
    Typography({ variant: "p", value: "RECETTE", className: subtitle }),
    Typography({ variant: "p", value: description, className: content })
  );
};

export default RecipeDescription;
