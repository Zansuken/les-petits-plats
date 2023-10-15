import { build } from "../../componentBuilder";
import { classNamesBuilder } from "../../helpers/classNames";
import Button from "./Button";
import Icon from "./Icon";

const styles = {
  root: "bg-white p-2.5 pl-9 flex rounded-xl min-w-[240px]",
  fullWidthStyle: "w-full",
  input: "w-full text-grey",
  crossIcon: "w-4",
};

const TextField = ({
  fullWidth,
  defaultValue,
  placeHolder,
  canReset,
  adornment,
  adornmentPosition,
  containerProps,
  textInputProps,
  onChange,
  onInput,
  onKeyEnter,
  onReset,
}) => {
  const { root, input, fullWidthStyle, crossIcon } = styles;

  const children = [
    build({
      element: "input",
      type: "text",
      className: textInputProps?.className ?? input,
      placeholder: placeHolder ?? "",
      value: defaultValue ?? "",
      onchange: onChange,
      oninput: onInput,
      ...textInputProps,
    }),
  ];

  if (canReset) {
    children.push(
      Button({
        label: Icon({
          src: "/assets/images/crossIcon.svg",
          className: crossIcon,
        }),
        variant: "text",
        onclick: onReset,
      })
    );
  }

  if (adornment) {
    if (adornmentPosition && adornmentPosition === "start") {
      children.unshift(adornment);
    } else {
      children.push(adornment);
    }
  }

  return build(
    {
      element: "div",
      className: classNamesBuilder([
        { className: root },
        { isUsed: fullWidth, className: fullWidthStyle },
      ]),
      oninput: onInput,
      onkeydown: ({ key } = { key: "" }) => key === "Enter" && onKeyEnter(),
      ...containerProps,
    },
    ...children
  );
};

export default TextField;
