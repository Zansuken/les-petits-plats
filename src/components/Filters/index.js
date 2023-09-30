import { build } from "../../componentBuilder";
import Options from "./Options";
import RecipesCount from "./RecipesCount";

const styles = {
  root: "flex items-center justify-between flex-wrap",
};

const Filters = () => {
  return build("div", { class: styles.root }, Options(), RecipesCount());
};

export default Filters;
