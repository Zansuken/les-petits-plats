import { build } from "../../componentBuilder";
import { classNamesBuilder } from "../../helpers/classNames";
import { resetParams } from "../../router/helpers";
import routes from "../../router/routes";
import { dispatch } from "../../store";
import { resetSelectedTags, setCurrentRoute } from "../../store/actions";
import Logo from "../shared/Logo";
import Search from "./Search";

const styles = {
  root: "w-full py-12 px-14 bg-no-repeat bg-cover bg-center relative bg-black bg-opacity-30",
  homePage: "bg-banner",
  backgroundImg:
    "-z-10 left-0 bottom-0 object-cover object-center w-full h-full absolute",
};

const Header = () => {
  const onClickHome = () => {
    dispatch(setCurrentRoute({ route: routes.HOME }));
    dispatch(resetSelectedTags());
    resetParams();
    window.location.reload();
  };

  return build(
    {
      element: "header",
      className: classNamesBuilder([
        { className: styles.root },
        { className: styles.homePage },
      ]),
    },
    Logo({
      isClickable: true,
      tabindex: 0,
      onclick: onClickHome,
      onkeydown: ({ key } = { key: "" }) => key === "Enter" && onClickHome(),
    }),
    Search()
  );
};

export default Header;
