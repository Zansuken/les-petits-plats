import { build, updateView } from "../../componentBuilder";
import { removeAccents } from "../../helpers/common";
import { addParams, removeParams } from "../../router/helpers";
import { dispatch } from "../../store";
import {
  setDefaultOptions,
  setFilteredOptions,
  setSelectedTags,
} from "../../store/actions";
import {
  filteredOptionsSelector,
  selectedTagsSelector,
  useSelector,
} from "../../store/selectors";
import MultipleSelect from "../shared/MultipleSelect";

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
let isIngredientsOpen = false;
let isApplianceOpen = false;
let isUtensilsOpen = false;

const Options = () => {
  const setIsIngredientsOpen = () => (isIngredientsOpen = true);
  const setIsIngredientsClosed = () => (isIngredientsOpen = false);
  const setIsApplianceOpen = () => (isApplianceOpen = true);
  const setIsApplianceClosed = () => (isApplianceOpen = false);
  const setIsUtensilsOpen = () => (isUtensilsOpen = true);
  const setIsUtensilsClosed = () => (isUtensilsOpen = false);

  const selectedTags = () => useSelector(selectedTagsSelector);

  const onSelect = (option) => {
    const { category, id: newTagId } = option;

    const concernedCategory = selectedTags()[category];

    let newTags = [...concernedCategory];

    if (concernedCategory.some(({ id }) => id === newTagId)) {
      newTags = newTags.filter(({ id }) => id !== newTagId);
    } else {
      newTags = [...newTags, option];
    }

    if (newTags.length > 0) {
      addParams({
        name: category,
        value: newTags.map(({ id }) => id),
      });
    } else {
      removeParams(category);
    }

    dispatch(setSelectedTags({ category, tags: newTags }));
    updateView(() => {});
  };

  /**
   * @typedef {Object} FormattedOptions
   * @property {string} id
   * @property {string} category
   * @property {string} name
   */

  /**
   *
   * @param {string} category
   * @returns {FormattedOptions[]} formatted options
   */
  const formattedOptions = (options, category) =>
    options.map((option) => ({
      id: removeAccents(option.name.toLowerCase().split(" ").join("_")),
      category,
      ...option,
    }));

  const formattedIngredients = formattedOptions(
    mockedOptions[0],
    "ingredients"
  );
  const formattedAppliance = formattedOptions(mockedOptions[1], "appliance");
  const formattedUtensils = formattedOptions(mockedOptions[2], "utensils");

  const { ingredients, appliance, utensils } = selectedTags();

  dispatch(
    setDefaultOptions({
      ingredients: formattedIngredients,
      appliance: formattedAppliance,
      utensils: formattedUtensils,
    })
  );

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

  return build(
    { element: "div", className: styles.root },
    MultipleSelect({
      id: "ingredients",
      label: "Ingrédients",
      options: formattedIngredients,
      selectedOptions: ingredients,
      isOpen: isIngredientsOpen,
      onOpen: setIsIngredientsOpen,
      onClose: setIsIngredientsClosed,
      onSelect,
      onSearch,
    }),
    MultipleSelect({
      id: "appliance",
      label: "Appareils",
      options: formattedAppliance,
      selectedOptions: appliance,
      isOpen: isApplianceOpen,
      onOpen: setIsApplianceOpen,
      onClose: setIsApplianceClosed,
      onSelect,
      onSearch,
    }),
    MultipleSelect({
      id: "utensils",
      label: "Ustensiles",
      options: formattedUtensils,
      selectedOptions: utensils,
      isOpen: isUtensilsOpen,
      onOpen: setIsUtensilsOpen,
      onClose: setIsUtensilsClosed,
      onSelect,
      onSearch,
    })
  );
};

export default Options;
