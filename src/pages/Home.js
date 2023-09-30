import { build } from "../componentBuilder";
import Filters from "../components/Filters";

const styles = {
  root: "py-5 px-24 w-full flex-1 bg-bg-grey",
};

const Home = () => {
  return build(
    "main",
    { class: styles.root },
    Filters(),
    build("div", { class: "h-[500px]" }, "Recipes")
  );
};

export default Home;
