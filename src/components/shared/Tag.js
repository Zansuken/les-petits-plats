import { build } from "../../componentBuilder";
import Icon from "./Icon";
import Typography from "./Typography";

const styles = {
  root: "group bg-yellow lg:p-4 p-2 rounded-[10px] flex align-middle lg:gap-[60px] gap-5 cursor-pointer focus:outline-white border-2 border-transparent hover:border-white",
  label: "group-hover:text-white group-focus:text-white text-[14px]",
  icon: "group-hover:invert group-focus:invert w-[10px]",
};

const Tag = ({ id, onClick, tag, label = "" }) => {
  return build(
    {
      key: `tag-${tag.id}`,
      ["data-id"]: id,
      element: "div",
      className: styles.root,
      tabindex: 0,
      onClick: () => onClick(tag),
    },
    Typography({ variant: "span", value: label, className: styles.label }),
    Icon({ src: "/assets/images/crossIconBlack.svg", className: styles.icon })
  );
};

export default Tag;
