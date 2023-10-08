import { build } from "../../../componentBuilder";
import classNamesBuilder from "../../../helpers/classNames";
import Icon from "../Icon";
import Typography from "../Typography";

const styles = {
  root: "flex p-4 gap-16 justify-between cursor-pointer",
  icon: "w-3",
  iconOpen: "rotate-180",
};

const Label = ({ onMenuOpen, label, isOpen }) => {
  const { root, icon, iconOpen } = styles;

  const iconClasses = classNamesBuilder([
    { className: icon },
    { isUsed: isOpen, className: iconOpen },
  ]);

  return build(
    { element: "div", className: root, onclick: onMenuOpen },
    Typography({ variant: "span", value: label }),
    Icon({
      src: "/assets/images/arrowDown.svg",
      className: iconClasses,
    })
  );
};

export default Label;
