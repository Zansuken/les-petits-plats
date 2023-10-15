import { build, updateView } from "../../../componentBuilder";
import { isNodeDiff, removeAccents } from "../../../helpers/common";
import { dispatch } from "../../../store";
import {
  addSelectedTag,
  removeSelectedTag,
  setDefaultOptions,
  setFilteredOptions,
} from "../../../store/actions";
import {
  filteredOptionsSelector,
  selectedTagsSelector,
  useSelector,
} from "../../../store/selectors";
import MultipleSelect from "../../shared/MultipleSelect";

const styles = {
  root: "flex gap-4 max-w-2xl w-[100%] justify-between flex-wrap",
};

/**
 * @type {string[]}
 */
const mockedOptions = [
  [
    {
      name: "Pâte feuilletée",
    },
    {
      name: "Oeuf",
    },
    {
      name: "Lait de coco",
    },
    {
      name: "Jus de citron",
    },
    {
      name: "Crème de coco",
    },
    {
      name: "Sucre",
    },
    {
      name: "Glaçons",
    },
  ],
  [
    {
      name: "Blender",
    },
    {
      name: "Saladier",
    },
    {
      name: "Cocotte",
    },
    {
      name: "Cuiseur de riz",
    },
    {
      name: "Four",
    },
    {
      name: "Casserole",
    },
  ],
  [
    {
      name: "couteau",
    },
    {
      name: "saladier",
    },
    {
      name: "cuillère en bois",
    },
    {
      name: "poêle à frire",
    },
    {
      name: "plat à gratin",
    },
    {
      name: "râpe à fromage",
    },
  ],
];

const CATEGORIES = ["ingredients", "appliance", "utensils"];

let isOpen = {
  ingredients: false,
  appliance: false,
  utensils: false,
};

const Options = () => {
  const selectedTags = () => useSelector(selectedTagsSelector);

  const onSelect = (option) => {
    const { category } = option;
    const concernedCategory = selectedTags()[category];

    if (concernedCategory.some((tag) => tag.id === option.id)) {
      dispatch(removeSelectedTag(option));
    } else {
      dispatch(addSelectedTag(option));
    }
    updateView();
  };

  const formattedOptions = (options, category) =>
    options.map((option) => ({
      id: removeAccents(option.name.toLowerCase().split(" ").join("_")),
      category,
      ...option,
    }));

  const onSearch = (input, id) => {
    const filteredOption = useSelector(filteredOptionsSelector(id));
    const { defaultResult } = filteredOption;

    let result = [];

    if (input) {
      result = defaultResult.filter(({ name }) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
    }

    dispatch(
      setFilteredOptions({
        category: id,
        ...filteredOption,
        result,
      })
    );
    updateView(() => {});
  };

  const multipleSelectInputs = CATEGORIES.map((category, index) => {
    const formatted = formattedOptions(mockedOptions[index], category);
    const selected = selectedTags()[category];
    const defaultOptions =
      useSelector(filteredOptionsSelector(category))?.defaultResult ?? [];

    if (isNodeDiff(defaultOptions, formatted)) {
      dispatch(setDefaultOptions({ [category]: formatted }));
    }

    return MultipleSelect({
      id: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
      options: formatted,
      selectedOptions: selected,
      isOpen: isOpen[category],
      onOpen: () => {
        for (let key in isOpen) {
          isOpen[key] = false;
        }
        isOpen[category] = true;
      },
      onClose: () => (isOpen[category] = false),
      onSelect,
      onSearch,
    });
  });

  return build(
    { element: "div", className: styles.root },
    ...multipleSelectInputs
  );
};

export default Options;
