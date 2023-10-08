import { build } from "../../componentBuilder";
import { resetParams } from "../../router/helpers";
import routes from "../../router/routes";
import { dispatch } from "../../store";
import { resetSelectedTags, setCurrentRoute } from "../../store/actions";
import Logo from "../shared/Logo";
import Search from "./Search";

const Header = () => {
  const onClickHome = () => {
    dispatch(setCurrentRoute({ route: routes.HOME }));
    dispatch(resetSelectedTags());
    resetParams();
  };

  return build(
    {
      element: "header",
      className:
        "bg-green w-full py-12 px-14 bg-banner bg-no-repeat bg-cover bg-center",
    },
    Logo({
      isClickable: true,
      onclick: onClickHome,
    }),
    Search()
  );
};

export default Header;
