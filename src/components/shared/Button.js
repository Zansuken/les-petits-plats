import { build } from "../../componentBuilder";
import { classNamesBuilder } from "../../helpers/classNames";
// eslint-disable-next-line no-unused-vars
import { ComponentType } from "../../types";

const styles = {
  root: "group rounded-md transition-all duration-300",
  iconPadding: "p-3",
  labelPadding: "px-4 py-2",
  icon: "invert group-hover:invert-0 transition-all duration-300",
  contained: "text-white hover:text-black text-xl bg-black hover:bg-yellow",
  text: "hover:bg-gray-200",
  outlined: "border-2 hover:border-yellow hover:bg-gray-200",
};

/**
 * Button component.
 *
 * @param {object} params - The parameters for the Button component.
 * @param {Function} params.onclick - The click event handler for the button.
 * @param {string|ComponentType} params.label - The label text or component to display on the button.
 * @param {("outlined"|"contained"|"text")} [params.variant="contained"] - The variant of the button (outlined, contained, or text).
 * @returns {ComponentType} - The Button component.
 */
const Button = ({ onclick, label, variant = "contained", ...props }) => {
  const isIconButton = typeof label === "object";
  const isStringButton = typeof label === "string";

  const { root, iconPadding, labelPadding, icon } = styles;

  const rootClasses = classNamesBuilder([
    { className: root },
    { className: styles[variant] },
    { className: isIconButton ? iconPadding : labelPadding },
  ]);

  let labelToDisplay = label;

  if (isIconButton) {
    labelToDisplay = {
      ...label,
      className: `${label.className} ${icon}`,
    };
  }

  if (isStringButton) {
    labelToDisplay = label.toString().toUpperCase();
  }

  return build(
    {
      element: "button",
      className: rootClasses,
      onclick,
      ...props,
    },
    labelToDisplay
  );
};

export default Button;
