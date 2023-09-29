import { build } from "../../../componentBuilder";
import Button from "../../shared/Button";
import Icon from "../../shared/Icon";
import TextField from "../../shared/TextField";

const Search = () => {
  return build(
    "div",
    { class: "px-60 py-36 flex flex-col gap-8 items-center" },
    build(
      "h1",
      {
        class:
          "font-title text-yellow text-4.5xl/[66px] text-center max-w-[720px]",
      },
      "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES"
    ),
    TextField({
      fullWidth: true,
      adornment: Button({
        label: Icon({
          src: "/assets/images/searchIcon.svg",
        }),
      }),
      placeHolder: "Rechercher une recette, un ingrédient, ...",
    })
  );
};

export default Search;
