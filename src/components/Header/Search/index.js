import { build, updateView } from "../../../componentBuilder";
import { store } from "../../../store";
import Button from "../../shared/Button";
import Icon from "../../shared/Icon";
import TextField from "../../shared/TextField";

const styles = {
  root: "px-60 py-36 flex flex-col gap-8 items-center",
  title: "font-title text-yellow text-4.5xl/[66px] text-center max-w-[720px]",
};

const Search = () => {
  const searchInput = () => store.getSearchInput();
  const onSearch = () => searchInput() && updateView(() => searchInput());

  const { root, title } = styles;

  return build(
    "div",
    { class: root },
    build(
      "h1",
      {
        class: title,
      },
      "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES"
    ),
    TextField({
      fullWidth: true,
      adornment: Button({
        label: Icon({
          src: "/assets/images/searchIcon.svg",
        }),
        onclick: onSearch,
      }),
      placeHolder: "Rechercher une recette, un ingrédient, ...",
      onInput: (event) => {
        store.setSearchInput(event.target.value ? event.target.value : "");
      },
      onKeyEnter: onSearch,
    })
  );
};

export default Search;
