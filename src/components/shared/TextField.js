import { build } from "../../componentBuilder";

const styles = (fullWidth) => ({
  root: `bg-white p-2.5 pl-9 flex rounded-xl ${fullWidth ? "w-full" : ""}`,
  input: "w-full text-grey",
});

const defaultProps = {
  fullWidth: true,
  placeHolder: "",
  adornment: null,
  adornmentPosition: "end",
  containerProps: {},
  textInputProps: {},
  onChange: () => {},
  onInput: () => {},
  onKeyEnter: () => {},
};

const TextField = ({
  fullWidth,
  placeHolder,
  adornment,
  adornmentPosition,
  containerProps,
  textInputProps,
  onChange,
  onInput,
  onKeyEnter,
} = defaultProps) => {
  const { root, input } = styles(fullWidth);

  const children = [
    build("input", {
      type: "text",
      class: defaultProps.textInputProps?.class ?? input,
      placeholder: placeHolder ?? "",
      ...textInputProps,
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
      class: defaultProps.containerProps?.class ?? root,
      onchange: onChange,
      oninput: onInput,
      onkeydown: ({ key }) => key === "Enter" && onKeyEnter(),
      ...containerProps,
    },
    ...children
  );
};

export default TextField;
