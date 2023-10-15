import { build, updateView } from "../../../componentBuilder";
import { classNamesBuilder } from "../../../helpers/classNames";
import { removeAccents } from "../../../helpers/common";
import { filteredOptionsSelector, useSelector } from "../../../store/selectors";
import Icon from "../Icon";
import Typography from "../Typography";
import Label from "./Label";
import OptionsList from "./OptionsList";

const styles = {
  root: "bg-white relative h-min w-48",
  rootClosed: "rounded-xl",
  rootOpen: "rounded-t-xl",
  listItem:
    "py-3 px-4 hover:bg-yellow last-of-type:rounded-b-xl cursor-pointer flex justify-between items-center",
  selectedListItem: "group bg-yellow",
  icon: "opacity-0 group-hover:opacity-100",
  label: "group-hover:font-bold",
};

const Options = ({ selectedOptions, id, onSelect }) => {
  const { listItem, selectedListItem, icon, label } = styles;
  const { defaultResult, result } = useSelector(filteredOptionsSelector(id));

  return (result ?? defaultResult).map((option) => {
    const isActive = selectedOptions.some(
      ({ id }) => removeAccents(id) === removeAccents(option.id)
    );

    return build(
      {
        key: `option-${option.id}`,
        element: "li",
        className: classNamesBuilder([
          { className: listItem },
          {
            className: selectedListItem,
            isUsed: isActive,
          },
        ]),
        onclick: () => onSelect(option),
      },
      Typography({ variant: "span", value: option?.name, className: label }),
      Icon({
        src: "assets/images/crossPlainIcon.svg",
        className: icon,
      })
    );
  });
};

const MultipleSelect = ({
  isOpen,
  onOpen,
  onClose,
  id,
  label,
  options,
  selectedOptions,
  onSelect,
  onSearch,
}) => {
  const { root, rootClosed, rootOpen } = styles;

  const { search, defaultResult, result } = useSelector(
    filteredOptionsSelector(id)
  );

  const optionsList = Options({
    id,
    options,
    selectedOptions,
    displayedOptions: result?.length === 0 ? defaultResult : result,
    onSelect,
  });

  const onMenuOpen = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
    updateView(() => {});
  };

  const rootClasses = classNamesBuilder([
    { className: root },
    { isUsed: !isOpen, className: rootClosed },
    { isUsed: isOpen, className: rootOpen },
  ]);

  return build(
    {
      element: "div",
      className: rootClasses,
      id: "multipleSelect",
    },
    Label({ isOpen, label, onMenuOpen }),
    OptionsList({ isOpen, optionsList, onSearch, search, options, id })
  );
};

export default MultipleSelect;
