import { build } from "../../componentBuilder";

const styles = {
  root: "font-title text-counter leading-8",
};

const RecipesCount = () => {
  return build("span", { class: styles.root }, "1500 recettes");
};

export default RecipesCount;
