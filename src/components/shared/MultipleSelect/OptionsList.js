import { build } from "../../../componentBuilder";
import { classNamesBuilder } from "../../../helpers/classNames";
import Icon from "../Icon";
import TextField from "../TextField";

const styles = {
  icon: "w-3",
  list: "transition-all absolute bg-white rounded-b-xl z-50",
  listClosed: "h-0 overflow-hidden",
  searchBoxContainer:
    "border-solid border-gray-light border rounded-sm flex justify-between pr-2",
  searchBox: "p-2 w-full max-w-[138px] text-grey",
  optionsContainer: "max-h-36 overflow-y-scroll",
};

const OptionsList = ({
  isOpen,
  optionsList,
  onSearch,
  id,
  search,
  onMenuOpen,
}) => {
  const {
    icon,
    list,
    listClosed,
    searchBox,
    searchBoxContainer,
    optionsContainer,
  } = styles;

  const rootClasses = classNamesBuilder([
    { className: list },
    { className: listClosed, isUsed: !isOpen },
  ]);

  document.addEventListener("click", (event) => {
    const isClickedInside = document
      .getElementById(`options-root-${id}`)
      .contains(event.target);

    if (!isClickedInside && isOpen) {
      onMenuOpen();
    }
  });

  return build(
    {
      element: "div",
      className: rootClasses,
      id: `options-root-${id}`,
    },
    build(
      {
        element: "div",
        className: "p-4 pt-0 pb-2",
      },
      TextField({
        containerProps: { className: searchBoxContainer },
        textInputProps: {
          className: searchBox,
          id: "searchBox",
          autofocus: true,
        },
        defaultValue: search,
        adornment: Icon({
          src: "/assets/images/searchIcon.svg",
          className: icon,
        }),
        onInput: (event) => onSearch(event.target?.value, id),
      })
    ),
    build(
      {
        element: "div",
        className: optionsContainer,
        id: "listItemContainer",
      },
      build({ element: "ul", id: "optionsList" }, ...optionsList)
    )
  );
};

export default OptionsList;
