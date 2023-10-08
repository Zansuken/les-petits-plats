import { build } from "../../componentBuilder";
import { getParams } from "../../router/helpers";
import { dispatch } from "../../store";
import { setSelectedTags } from "../../store/actions";
import Options from "./Options";
import RecipesCount from "./RecipesCount";

const styles = {
  root: "flex items-center justify-between flex-wrap",
};

const processParam = (category) => {
  const param = getParams().find(({ name }) => name === category);

  if (param !== undefined) {
    const tags = param.value
      .split(",")
      .map((value) => ({ category, id: value }));
    dispatch(setSelectedTags({ category, tags }));
  }
};

processParam("ingredients");
processParam("appliance");
processParam("utensils");

const Filters = () => {
  return build(
    { element: "div", className: styles.root },
    Options(),
    RecipesCount()
  );
};

export default Filters;
