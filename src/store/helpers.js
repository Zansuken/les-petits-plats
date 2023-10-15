export const updateFilteredOptions = ({
  state,
  payload,
  initialFilteredOption,
  optionKey,
}) => {
  const allKeys = { ...state.filteredOptions, ...payload };

  return Object.keys(allKeys).reduce((updatedOptions, key) => {
    const isKeyInPayload = key in payload;
    const existingOption = state.filteredOptions[key];
    const updatedOption = isKeyInPayload
      ? {
          ...existingOption,
          [optionKey]: payload[key],
        }
      : existingOption || initialFilteredOption;

    return { ...updatedOptions, [key]: updatedOption };
  }, {});
};

export const addTagToStore = (currentTags, newTag) =>
  currentTags.some((tag) => tag.id === newTag.id)
    ? currentTags
    : [...currentTags, newTag];

export const removeTagFromStore = (currentTags, tagToRemove) =>
  currentTags.filter((tag) => tag.id !== tagToRemove.id);
