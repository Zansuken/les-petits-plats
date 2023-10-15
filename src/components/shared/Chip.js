import { build } from "../../componentBuilder";
import { classNamesBuilder } from "../../helpers/classNames";
import Typography from "./Typography";

const styles = {
  root: "text-xs py-1 px-4",
};

const Chip = ({ label, className, ...props }) => {
  return build(
    {
      element: "div",
      className: classNamesBuilder([
        { className: "bg-yellow rounded-xl" },
        { className, isUsed: Boolean(className) },
      ]),
      ...props,
    },
    Typography({
      variant: "span",
      value: label,
      className: styles.root,
    })
  );
};

export default Chip;
