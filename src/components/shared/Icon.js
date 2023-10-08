import { build } from "../../componentBuilder";

const Icon = ({ src, ...props }) => build({ element: "img", src, ...props });

export default Icon;
