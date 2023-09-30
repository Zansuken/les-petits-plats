import { build } from "../../componentBuilder";
import MultipleSelect from "../shared/MultipleSelect";

const styles = {
  root: "flex gap-4 max-w-2xl w-[100%] justify-between flex-wrap",
};

const mockedOptions = [
  {
    name: "Option 1",
  },
  {
    name: "Option 2",
  },
  {
    name: "Option 3",
  },
];
let isIngredientsOpen = false;
let isMachinesOpen = false;
let isToolsOpen = false;

const Options = () => {
  const setIsIngredientsOpen = () => (isIngredientsOpen = true);
  const setIsIngredientsClosed = () => (isIngredientsOpen = false);
  const setIsMachinesOpen = () => (isMachinesOpen = true);
  const setIsMachinesClosed = () => (isMachinesOpen = false);
  const setIsToolsOpen = () => (isToolsOpen = true);
  const setIsToolsClosed = () => (isToolsOpen = false);

  return build(
    "div",
    { class: styles.root },
    MultipleSelect({
      label: "Ingrédients",
      options: mockedOptions,
      isOpen: () => isIngredientsOpen,
      onOpen: setIsIngredientsOpen,
      onClose: setIsIngredientsClosed,
    }),
    MultipleSelect({
      label: "Appareils",
      options: mockedOptions,
      isOpen: () => isMachinesOpen,
      onOpen: setIsMachinesOpen,
      onClose: setIsMachinesClosed,
    }),
    MultipleSelect({
      label: "Ustensiles",
      options: mockedOptions,
      isOpen: () => isToolsOpen,
      onOpen: setIsToolsOpen,
      onClose: setIsToolsClosed,
    })
  );
};

export default Options;
