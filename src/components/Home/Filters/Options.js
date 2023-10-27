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
  searchSelector,
  selectedTagsSelector,
  useSelector,
} from "../../../store/selectors";
import MultipleSelect from "../../shared/MultipleSelect";
import recipesData from "../../../../database/recipes.js";
import { categories } from "../../../constants/tags";
import { getFilteredTagFromSearch } from "../../Header/Search";
import { translate } from "../../../helpers/translations";

const styles = {
  root: "flex gap-4 max-w-2xl w-[100%] justify-between flex-wrap",
};

// TODO: Move to dataHelpers
export const formattedOptions = (options, category) =>
  options
    .map((option) => ({
      id: removeAccents(option.name.toLowerCase().split(" ").join("_")),
      category,
      ...option,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

const getConcernedItems = (category) => {
  const [
    { filteredIngredients },
    { filteredAppliances },
    { filteredUtensils },
  ] = getFilteredTagFromSearch();

  switch (category) {
    case categories.INGREDIENTS:
      return filteredIngredients;

    case categories.APPLIANCE:
      return filteredAppliances;

    case categories.UTENSILS:
      return filteredUtensils;

    default:
      break;
  }
};

const options = () => {
  const ingredients = new Set([]);
  const appliances = new Set([]);
  const utensils = new Set([]);

  recipesData.forEach((recipeData) => {
    appliances.add(recipeData.appliance.toLowerCase());
    recipeData.ustensils.forEach((utensil) =>
      utensils.add(utensil.toLowerCase())
    );
    recipeData.ingredients.forEach(({ ingredient }) =>
      ingredients.add(ingredient.toLowerCase())
    );
  });

  return [
    Array.from(ingredients).map((item) => ({ name: item })),
    Array.from(appliances).map((item) => ({ name: item })),
    Array.from(utensils).map((item) => ({ name: item })),
  ];
};

let isOpen = {
  ingredients: false,
  appliance: false,
  utensils: false,
};

const Options = () => {
  const selectedTags = () => useSelector(selectedTagsSelector);
  const searchInput = () => useSelector(searchSelector);

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

  const onSearch = (input, id) => {
    const filteredOption = useSelector(filteredOptionsSelector(id));
    const { defaultResult } = filteredOption;

    const lowerCaseInput = input?.toLowerCase();
    const searchInputExists = searchInput();

    const items = searchInputExists
      ? getConcernedItems(id).sort((a, b) => a.name.localeCompare(b.name))
      : defaultResult.sort((a, b) => a.name.localeCompare(b.name));
    const result = input
      ? items.filter(({ name }) => name.toLowerCase().includes(lowerCaseInput))
      : items;

    dispatch(
      setFilteredOptions({
        category: id,
        ...filteredOption,
        result,
      })
    );
    updateView();
  };

  const multipleSelectInputs = Object.values(categories).map(
    (category, index) => {
      const formatted = formattedOptions(options()[index], category);
      const selected = selectedTags()[category];
      const defaultOptions =
        useSelector(filteredOptionsSelector(category))?.defaultResult ?? [];

      if (isNodeDiff(defaultOptions, formatted)) {
        dispatch(setDefaultOptions({ [category]: formatted }));
      }

      return MultipleSelect({
        id: category,
        label: translate(`tags.categoriesLabels.${category}`),
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
    }
  );

  return build(
    { element: "div", className: styles.root },
    ...multipleSelectInputs
  );
};

export default Options;
