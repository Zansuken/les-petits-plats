import { build } from "../../../componentBuilder";
import classNamesBuilder from "../../../helpers/classNames";
import Icon from "../Icon";

const styles = {
  root: "flex p-4 gap-16 justify-between cursor-pointer",
  icon: "w-3",
  iconOpen: "rotate-180",
};

const Label = ({ onMenuOpen, label, isOpen }) => {
  const { root, icon, iconOpen } = styles;

  const iconClasses = classNamesBuilder([
    { isUsed: true, value: icon },
    { isUsed: isOpen(), value: iconOpen },
  ]);

  return build(
    "div",
    { class: root, onclick: onMenuOpen },
    build("span", { class: label }, label),
    Icon({
      src: "/assets/images/arrowDown.svg",
      class: iconClasses,
    })
  );
};

export default Label;
