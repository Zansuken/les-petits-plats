import { build } from "../../componentBuilder";
import classNamesBuilder from "../../helpers/classNames";

const styles = {
  root: "group text-white hover:text-black text-xl bg-black hover:bg-yellow rounded-md transition-all duration-300",
  iconPadding: "p-3",
  labelPadding: "px-4 py-2",
  icon: "invert group-hover:invert-0 transition-all duration-300",
};

const Button = ({ onclick, label, ...props }) => {
  const isIconButton = typeof label === "object";
  const isStringButton = typeof label === "string";

  const { root, iconPadding, labelPadding, icon } = styles;

  const rootClasses = classNamesBuilder([
    { isUsed: true, value: root },
    { isUsed: true, value: isIconButton ? iconPadding : labelPadding },
  ]);

  let labelToDisplay = label;

  if (isIconButton) {
    labelToDisplay = {
      ...label,
      props: { ...label.props, class: icon },
    };
  }

  if (isStringButton) {
    labelToDisplay = label.toString().toUpperCase();
  }

  return build(
    "button",
    {
      class: rootClasses,
      onclick,
      ...props,
    },
    labelToDisplay
  );
};

export default Button;
