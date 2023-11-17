import { build } from "../componentBuilder";
import Filters from "../components/Home/Filters";
import HomeContent from "../components/Home";
import Tags from "../components/Home/Tags";
import {
  displayedRecipesSelector,
  recipesSelector,
  searchSelector,
  selectedTagsSelector,
  useSelector,
} from "../store/selectors";
import { getDisplayedRecipes } from "../helpers/dataHelpers";
import Typography from "../components/shared/Typography";
import { classNamesBuilder } from "../helpers/classNames";

const styles = {
  root: "py-5 px-24 w-full flex-1 bg-bg-grey flex flex-col",
  messageHidden: "hidden",
  messageVisible:
    "flex w-full h-full justify-center items-center pt-10 text-lg",
};

const Home = () => {
  const selectedTags = useSelector(selectedTagsSelector);
  const currentSearch = () => useSelector(searchSelector);

  const allSelectedTags = [
    ...selectedTags.ingredients,
    ...selectedTags.appliance,
    ...selectedTags.utensils,
  ];

  const allRecipes = useSelector(recipesSelector);
  const displayedRecipes = useSelector(displayedRecipesSelector);
  const { appliance, utensils, ingredients } =
    useSelector(selectedTagsSelector);

  const currentRecipes = getDisplayedRecipes(
    allRecipes,
    displayedRecipes,
    ingredients,
    appliance,
    utensils
  );

  return build(
    {
      element: "main",
      className: styles.root,
    },
    Filters({ recipesCount: currentRecipes.length }),
    Tags({ tags: allSelectedTags }),
    build(
      {
        element: "div",
        className: classNamesBuilder([
          {
            className: styles.messageVisible,
            isUsed: currentRecipes.length === 0,
          },
          {
            className: styles.messageHidden,
            isUsed: currentRecipes.length > 0,
          },
        ]),
      },
      Typography({
        variant: "h2",
        value: `Aucune recette ne contient ‘${currentSearch()}’ vous pouvez chercher «
    tarte aux pommes », « poisson », etc.`,
      })
    ),
    HomeContent({ currentRecipes })
  );
};

export default Home;
