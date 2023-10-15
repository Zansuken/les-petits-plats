import { build } from "../../componentBuilder";
import { classNamesBuilder } from "../../helpers/classNames";

const styles = {
  root: "h-6",
  cursorPointer: "cursor-pointer",
};

const Logo = ({ isClickable, ...props }) =>
  build({
    element: "img",
    src: "/assets/images/logo.svg",
    className: classNamesBuilder([
      { className: styles.root },
      { isUsed: isClickable, className: styles.cursorPointer },
    ]),
    ...props,
  });

export default Logo;
