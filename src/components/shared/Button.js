import { build } from "../../componentBuilder";

const Button = ({ onclick, label, ...props }) => {
  const isIconButton = typeof label === "object";
  const labelPadding = isIconButton ? "p-3" : "px-8 py-4";

  let labelToDisplay = label;

  if (isIconButton) {
    labelToDisplay = {
      ...label,
      props: { ...label.props, class: "invert group-hover:invert-0" },
    };
  }

  return build(
    "button",
    {
      class: `group ${labelPadding} text-white hover:text-black text-xl bg-black hover:bg-yellow rounded-md`,
      onclick,
      ...props,
    },
    labelToDisplay
  );
};

export default Button;
