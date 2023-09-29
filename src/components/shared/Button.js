import { build } from "../../componentBuilder";

const Button = ({ onclick, label }) => {
  return build(
    "button",
    {
      class:
        "px-8 py-4 text-white hover:text-black text-xl bg-black hover:bg-yellow rounded-md",
      onclick,
    },
    label
  );
};

export default Button;
