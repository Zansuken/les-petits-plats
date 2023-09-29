import { build } from "../../componentBuilder";

const Logo = () =>
  build("img", { src: "/assets/images/logo.svg", class: "h-6" });

export default Logo;
