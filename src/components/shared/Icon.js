import { build } from "../../componentBuilder";

const Icon = ({ src, ...props }) => build("img", { src, ...props });

export default Icon;
