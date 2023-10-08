import { removeAccents } from "../helpers/common";

export const updateRoute = (route) =>
  window.history.pushState(null, null, removeAccents(route));

const getCurrentParams = () =>
  Array.from(
    new URLSearchParams(new URL(window.location.href).search.substring(1)),
    ([name, value]) => ({
      name,
      value,
    })
  );

export const getParams = () => {
  const currentParams = getCurrentParams();

  return currentParams;
};

export const addParams = (params) => {
  const currentParams = getCurrentParams();

  let newParams = [...currentParams];

  if (Array.isArray(params)) {
    params.forEach((newParam) => {
      const existingParamIndex = currentParams.findIndex(
        (oldParam) => oldParam.name === newParam.name
      );
      if (existingParamIndex !== -1) {
        newParams[existingParamIndex] = newParam;
      } else {
        newParams.push(newParam);
      }
    });
  }

  if (params?.name) {
    const existingParamIndex = newParams.findIndex(
      ({ name }) => name === params.name
    );
    if (existingParamIndex !== -1) {
      newParams[existingParamIndex] = params;
    } else {
      newParams.push(params);
    }
  }

  const newURL = `${window.location.pathname}?${newParams
    .map((param) => `${param.name}=${param.value.toString()}`)
    .join("&")}`;

  updateRoute(newURL);
};

export const removeParams = (params) => {
  const currentParams = getCurrentParams();

  let newParams = [...currentParams];

  if (typeof params === "string") {
    newParams = newParams.filter((param) => param.name !== params);
  } else if (Array.isArray(params)) {
    newParams = newParams.filter((param) => !params.includes(param.name));
  }

  if (newParams.length === 0) {
    resetParams();
    return;
  }

  const newURL = `${window.location.pathname}?${newParams
    .map((param) => `${param.name}=${param.value.toString()}`)
    .join("&")}`;

  updateRoute(newURL);
};

export const resetParams = () => updateRoute(window.location.pathname);
