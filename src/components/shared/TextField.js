import { build } from "../../componentBuilder";

const defaultProps = {
  fullWidth: true,
  placeHolder: "",
  adornment: null,
  adornmentPosition: "end",
};

const TextField = ({
  fullWidth,
  placeHolder,
  adornment,
  adornmentPosition,
} = defaultProps) => {
  const children = [
    build("input", {
      type: "text",
      class: "w-full text-grey",
      placeholder: placeHolder ?? "",
    }),
  ];

  if (adornment) {
    if (adornmentPosition && adornmentPosition === "start") {
      children.unshift(adornment);
    } else {
      children.push(adornment);
    }
  }

  return build(
    "div",
    {
      class: `bg-white p-2.5 pl-9 flex rounded-xl ${fullWidth ? "w-full" : ""}`,
    },
    ...children
  );
};

export default TextField;
