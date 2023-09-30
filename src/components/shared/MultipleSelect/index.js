import { build, updateView } from "../../../componentBuilder";
import classNamesBuilder from "../../../helpers/classNames";
import Label from "./Label";
import OptionsList from "./OptionsList";

const styles = {
  root: "bg-white relative h-min w-48",
  rootClosed: "rounded-xl",
  rootOpen: "rounded-t-xl",
  listItem:
    "py-3 px-4 hover:bg-yellow last-of-type:rounded-b-xl cursor-pointer",
};

const defaultProps = {
  isOpen: () => {},
  label: "",
  options: [],
  onOpen: () => {},
  onClose: () => {},
  onSelect: () => {},
};

const MultipleSelect = ({
  isOpen,
  onOpen,
  onClose,
  label,
  options,
  onSelect,
} = defaultProps) => {
  const { listItem, root, rootClosed, rootOpen } = styles;

  const optionsList =
    options?.map((option) =>
      build("li", { class: listItem, onclick: onSelect }, option?.name)
    ) ?? [];

  const onMenuOpen = () => {
    if (isOpen()) {
      onClose();
    } else {
      onOpen();
    }
    updateView(() => {});
  };

  const rootClasses = classNamesBuilder([
    { isUsed: true, value: root },
    { isUsed: !isOpen(), value: rootClosed },
    { isUsed: isOpen(), value: rootOpen },
  ]);

  return build(
    "div",
    {
      class: rootClasses,
    },
    Label({ isOpen, label, onMenuOpen }),
    OptionsList({ isOpen, optionsList })
  );
};

export default MultipleSelect;
