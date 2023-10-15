import { build } from "../componentBuilder";
import Filters from "../components/Home/Filters";
import HomeContent from "../components/Home";
import Tags from "../components/Home/Tags";
import { selectedTagsSelector, useSelector } from "../store/selectors";

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

  return build(
    {
      element: "main",
      className: styles.root,
    },
    Filters(),
    Tags({ tags: allSelectedTags }),
    HomeContent()
  );
};

export default Home;
