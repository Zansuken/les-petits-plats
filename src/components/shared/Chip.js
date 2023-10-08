import { build } from "../../componentBuilder";
import Typography from "./Typography";

const styles = {
  root: "text-xs py-1 px-4",
};

const Chip = ({ label }) => {
  return build(
    {
      element: "div",
      className: "bg-yellow rounded-xl",
    },
    Typography({
      variant: "span",
      value: label,
      className: styles.root,
    })
  );
};

export default Chip;
