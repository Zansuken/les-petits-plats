import { build, updateView } from "../../../componentBuilder";
import { debounce } from "../../../helpers/common";
import { addParams, getParams, removeParams } from "../../../router/helpers";
import { dispatch } from "../../../store";
import { setSearchInput } from "../../../store/actions";
import { searchSelector, useSelector } from "../../../store/selectors";
import Button from "../../shared/Button";
import Icon from "../../shared/Icon";
import TextField from "../../shared/TextField";

const styles = {
  root: "px-60 py-36 flex flex-col gap-8 items-center",
  title: "font-title text-yellow text-4.5xl/[66px] text-center max-w-[720px]",
};

const Search = () => {
  const currentParamsSearch = getParams().find(({ name }) => name === "search");

  const onInput = debounce((event) => {
    if (event?.target) {
      dispatch(setSearchInput(event.target.value ?? ""));
    }
  }, 300);

  const searchInput = () => useSelector(searchSelector);

  const onSearch = () => {
    if (searchInput()) {
      addParams({ name: "search", value: searchInput() });
      updateView();

      // TODO: Create the logic to filter the recipes here:
    } else {
      removeParams("search");
      dispatch(setSearchInput(""));
    }
  };

  const onResetSearch = () => {
    removeParams("search");
    dispatch(setSearchInput(""));
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
      placeHolder: "Rechercher une recette, un ingrédient, ...",
      defaultValue: currentParamsSearch?.value ?? "",
      onInput,
      onKeyEnter: onSearch,
      onReset: onResetSearch,
    })
  );
};

export default Search;
