import { build } from "../componentBuilder";
import Filters from "../components/Home/Filters";
import HomeContent from "../components/Home";
import Tags from "../components/Home/Tags";
import {
  displayedRecipesSelector,
  recipesSelector,
  selectedTagsSelector,
  useSelector,
} from "../store/selectors";
import { getDisplayedRecipes } from "../helpers/dataHelpers";

const styles = {
  root: "py-5 px-24 w-full flex-1 bg-bg-grey",
};

const Home = () => {
  const selectedTags = useSelector(selectedTagsSelector);

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
    HomeContent({ currentRecipes })
  );
};

export default Home;
