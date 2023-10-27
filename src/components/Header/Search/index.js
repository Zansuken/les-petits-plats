import { build, updateView } from "../../../componentBuilder";
import { categories } from "../../../constants/tags";
import { debounce, removeAccents } from "../../../helpers/common";
import { addParams, getParams, removeParams } from "../../../router/helpers";
import { dispatch } from "../../../store";
import {
  resetDisplayedRecipes,
  resetFilteredOptions,
  resetSelectedTags,
  setDisplayedRecipes,
  setFilteredOptions,
  setSearchInput,
} from "../../../store/actions";
import {
  allDefaultOptionsSelector,
  recipesSelector,
  searchSelector,
  useSelector,
} from "../../../store/selectors";
import Button from "../../shared/Button";
import Icon from "../../shared/Icon";
import TextField from "../../shared/TextField";
import { filterRecipe } from "./helpers.js";

const getDefaultTagsByCategory = (defaultTags) => {
  const filterTagsByCategory = (tagCategory) =>
    defaultTags.filter(({ category }) => category === tagCategory);

  return [
    filterTagsByCategory(categories.INGREDIENTS),
    filterTagsByCategory(categories.APPLIANCE),
    filterTagsByCategory(categories.UTENSILS),
  ];
};

const getTagId = (tag) => removeAccents(tag.toLowerCase().split(" ").join("_"));

export const getFilteredTagFromSearch = () => {
  const recipes = useSelector(recipesSelector);
  const searchInput = () => useSelector(searchSelector);
  const allDefaultOptions = useSelector(allDefaultOptionsSelector);
  const filteredRecipes = filterRecipe(recipes, searchInput());

  const concernedRecipes = filteredRecipes.map((id) =>
    recipes.find((recipe) => recipe.id === id)
  );

  const [defaultIngredientsTags, defaultAppliancesTags, defaultUtensilsTags] =
    getDefaultTagsByCategory(allDefaultOptions);
  const filteredIngredients = [];
  const filteredAppliances = [];
  const filteredUtensils = [];

  concernedRecipes.forEach(({ ingredients, appliance, ustensils }) => {
    ingredients.forEach((ingredient) => {
      if (
        !filteredIngredients.some(
          ({ id }) => getTagId(ingredient.ingredient) === id
        )
      )
        filteredIngredients.push(
          defaultIngredientsTags.find(
            ({ id }) => getTagId(ingredient.ingredient) === id
          )
        );
    });
    if (!filteredAppliances.some(({ id }) => getTagId(appliance) === id))
      filteredAppliances.push(
        defaultAppliancesTags.find(({ id }) => getTagId(appliance) === id)
      );

    ustensils.forEach((utensil) => {
      if (!filteredUtensils.some(({ id }) => getTagId(utensil) === id))
        filteredUtensils.push(
          defaultUtensilsTags.find(({ id }) => getTagId(utensil) === id)
        );
    });
  });

  return [
    {
      defaultIngredientsTags,
      filteredIngredients,
    },
    {
      defaultAppliancesTags,
      filteredAppliances,
    },
    {
      defaultUtensilsTags,
      filteredUtensils,
    },
  ];
};

const styles = {
  root: "px-60 py-36 flex flex-col gap-8 items-center",
  title: "font-title text-yellow text-4.5xl/[66px] text-center max-w-[720px]",
};

const Search = () => {
  const currentParamsSearch = getParams().find(({ name }) => name === "search");
  const recipes = useSelector(recipesSelector);

  const onInput = debounce((event) => {
    if (event?.target) {
      dispatch(setSearchInput(event.target.value ?? ""));
    }
  }, 300);

  const searchInput = () => useSelector(searchSelector);

  const onSearch = () => {
    if (searchInput().length < 3) return;
    if (searchInput()) {
      dispatch(resetFilteredOptions());
      dispatch(resetSelectedTags());
      addParams({ name: "search", value: searchInput() });
      const filteredRecipes = filterRecipe(recipes, searchInput());

      const [
        { defaultIngredientsTags, filteredIngredients },
        { defaultAppliancesTags, filteredAppliances },
        { defaultUtensilsTags, filteredUtensils },
      ] = getFilteredTagFromSearch();

      dispatch(setDisplayedRecipes(filteredRecipes));

      dispatch(
        setFilteredOptions({
          category: categories.INGREDIENTS,
          ...defaultIngredientsTags,
          result: filteredIngredients,
        })
      );

      dispatch(
        setFilteredOptions({
          category: categories.APPLIANCE,
          ...defaultAppliancesTags,
          result: filteredAppliances,
        })
      );

      dispatch(
        setFilteredOptions({
          category: categories.UTENSILS,
          ...defaultUtensilsTags,
          result: filteredUtensils,
        })
      );

      updateView();
    } else {
      removeParams("search");
      dispatch(setSearchInput(""));
    }
  };

  const onResetSearch = () => {
    removeParams("search");
    dispatch(setSearchInput(""));
    dispatch(resetDisplayedRecipes());
    dispatch(resetFilteredOptions());
    dispatch(resetSelectedTags());
    updateView();
  };

  const { root, title } = styles;

  return build(
    { element: "div", className: root },
    build(
      {
        element: "h1",
        className: title,
      },
      "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES"
    ),
    TextField({
      fullWidth: true,
      canReset: true,
      adornment: Button({
        label: Icon({
          src: "/assets/images/searchIcon.svg",
        }),
        onclick: onSearch,
      }),
      textInputProps: {
        id: "mainSearchInput",
      },
      placeHolder: "Rechercher une recette, un ingrédient, ...",
      defaultValue: currentParamsSearch?.value ?? "",
      onInput,
      onKeyEnter: onSearch,
      onReset: onResetSearch,
    })
  );
};

export default Search;
