import { build, updateView } from "../../../componentBuilder";
import { debounce } from "../../../helpers/common";
import { addParams, getParams, removeParams } from "../../../router/helpers";
import { dispatch } from "../../../store";
import {
  resetDisplayedRecipes,
  setDisplayedRecipes,
  setSearchInput,
} from "../../../store/actions";
import {
  recipesSelector,
  searchSelector,
  useSelector,
} from "../../../store/selectors";
import Button from "../../shared/Button";
import Icon from "../../shared/Icon";
import TextField from "../../shared/TextField";
import { filterRecipe } from "./helpers.js";

const styles = {
  root: "px-60 py-36 flex flex-col gap-8 items-center",
  title: "font-title text-yellow text-4.5xl/[66px] text-center max-w-[720px]",
};

const Search = () => {
  const currentParamsSearch = getParams().find(({ name }) => name === "search");
  const recipes = useSelector(recipesSelector);

  const onInput = debounce((event) => {
    if (event?.target) {
      dispatch(setSearchInput(event.target.value ?? ""));
    }
  }, 300);

  const searchInput = () => useSelector(searchSelector);

  const onSearch = () => {
    if (searchInput().length < 3) return;
    if (searchInput()) {
      addParams({ name: "search", value: searchInput() });

      dispatch(setDisplayedRecipes(filterRecipe(recipes, searchInput())));

      updateView();
    } else {
      removeParams("search");
      dispatch(setSearchInput(""));
    }
  };

  const onResetSearch = () => {
    removeParams("search");
    dispatch(setSearchInput(""));
    dispatch(resetDisplayedRecipes());
    updateView();
  };

  const { root, title } = styles;

  return build(
    { element: "div", className: root },
    build(
      {
        element: "h1",
        className: title,
      },
      "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES"
    ),
    TextField({
      fullWidth: true,
      canReset: true,
      adornment: Button({
        label: Icon({
          src: "/assets/images/searchIcon.svg",
        }),
        onclick: onSearch,
      }),
      textInputProps: {
        id: "mainSearchInput",
      },
      placeHolder: "Rechercher une recette, un ingrédient, ...",
      defaultValue: currentParamsSearch?.value ?? "",
      onInput,
      onKeyEnter: onSearch,
      onReset: onResetSearch,
    })
  );
};

export default Search;
