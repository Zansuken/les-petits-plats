import { build } from "../../componentBuilder";

const Chip = ({ label }) => {
  return build(
    "div",
    { class: "bg-yellow rounded-xl" },
    build("span", { class: "text-xs py-1 px-4" }, label)
  );
};

export default Chip;
