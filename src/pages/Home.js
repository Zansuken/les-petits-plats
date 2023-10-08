import { build } from "../componentBuilder";
import Filters from "../components/Filters";

const styles = {
  root: "py-5 px-24 w-full flex-1 bg-bg-grey",
};

const Home = () => {
  return build(
    {
      element: "main",
      className: styles.root,
    },
    Filters(),
    build(
      {
        element: "div",
        className: "h-[500px]",
      },
      "Recipes"
    )
  );
};

export default Home;
