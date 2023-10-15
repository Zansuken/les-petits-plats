import Typography from "../../shared/Typography";

const styles = {
  root: "font-title text-counter leading-8",
};

const RecipesCount = ({ count }) =>
  Typography({
    variant: "span",
    value: `${count} recettes`,
    props: { className: styles.root },
  });

export default RecipesCount;
