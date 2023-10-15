import { build } from "../../../componentBuilder";
import Typography from "../../shared/Typography";

const styles = {
  ingredient: "font-medium text-[14px]",
  quantity: "text-grey text-[14px]",
};

const Ingredient = ({ ingredient, quantity, unit }) => {
  const shortenedUnits = ["cl", "g", "ml", "kg"];

  const displayedData =
    !quantity && !unit
      ? "-"
      : `${quantity ?? ""}${shortenedUnits.includes(unit) ? "" : " "}${
          unit ?? ""
        }`;

  return build(
    { element: "div" },
    Typography({
      variant: "p",
      value: ingredient,
      className: styles.ingredient,
    }),
    Typography({
      variant: "p",
      value: displayedData,
      className: styles.quantity,
    })
  );
};

export default Ingredient;
