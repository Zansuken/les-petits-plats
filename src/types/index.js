/**
 * Represents a virtual DOM component.
 * @typedef {object} ComponentType
 * @property {HTMLElement} element - The DOM element of the component.
 * @property {string} key - The key of the component.
 * @property {string} className - The class name of the component.
 * @property {object} props - The properties of the component, including an optional id if a key is provided.
 * @property {Array<ComponentType|string>} children - The children of the component.
 */

const ComponentType = {};

export { ComponentType };
