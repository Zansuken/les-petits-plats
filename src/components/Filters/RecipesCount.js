import Typography from "../shared/Typography";

const styles = {
  root: "font-title text-counter leading-8",
};

const RecipesCount = () =>
  Typography({
    variant: "span",
    value: "1500 recettes",
    props: { className: styles.root },
  });

export default RecipesCount;
