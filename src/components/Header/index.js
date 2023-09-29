import { build } from "../../componentBuilder";
import Logo from "../shared/Logo";
import Search from "./Search";

const Header = () => {
  return build(
    "header",
    {
      class:
        "bg-green w-full py-12 px-14 bg-banner bg-no-repeat bg-cover bg-center",
    },
    Logo(),
    Search()
  );
};

export default Header;
