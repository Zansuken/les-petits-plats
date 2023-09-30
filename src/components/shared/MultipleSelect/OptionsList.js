import { build } from "../../../componentBuilder";
import classNamesBuilder from "../../../helpers/classNames";
import Icon from "../Icon";
import TextField from "../TextField";

const styles = {
  icon: "w-3",
  list: "transition-all absolute bg-white rounded-b-xl z-50",
  listClosed: "h-0 overflow-hidden",
  searchBoxContainer:
    "border-solid border-gray-light border rounded-sm flex justify-between pr-2",
  searchBox: "p-2 w-full max-w-[138px] text-grey",
};

const OptionsList = ({ isOpen, optionsList }) => {
  const { icon, list, listClosed, searchBox, searchBoxContainer } = styles;

  const rootClasses = classNamesBuilder([
    { value: list, isUsed: true },
    { value: listClosed, isUsed: !isOpen() },
  ]);

  return build(
    "div",
    {
      class: rootClasses,
    },
    build(
      "div",
      { class: "p-4 pt-0 pb-2" },
      TextField({
        containerProps: { class: searchBoxContainer },
        textInputProps: { class: searchBox },
        adornment: Icon({
          src: "/assets/images/searchIcon.svg",
          class: icon,
        }),
      })
    ),
    build("div", {}, build("ul", {}, ...optionsList))
  );
};

export default OptionsList;
