import { build } from "../../componentBuilder";
// eslint-disable-next-line no-unused-vars
import { ComponentType } from "../../types";

/**
 * This function creates a typography element with the specified variant, value, and props.
 *
 * @function Typography
 * @param {object} options - The options for the typography element.
 * @param {('h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'p'|'span')} options.variant - The variant of the typography element. Can be any of the headings or a p or a span.
 * @param {(string|ComponentType)} options.value - The value of the typography element. Can contain a string and/or a span.
 * @param {object} options.props - The props of the typography element. Any attributes that can be handled by the mentioned HTML tags.
 * @returns {ComponentType} The created typography element.
 */
const Typography = ({ variant, value, className, props }) =>
  build({ element: variant, className, ...props } ?? {}, value);

export default Typography;
