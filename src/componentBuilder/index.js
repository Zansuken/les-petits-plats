import { root } from "../../main";
import App from "../App";
// eslint-disable-next-line no-unused-vars
import { Component } from "../types";

/**
 * Creates a virtual DOM node.
 * @param {string} type - The type of the DOM node.
 * @param {object} props - The properties of the DOM node.
 * @param {...Component} children - The children of the DOM node.
 * @returns {object} The virtual DOM node.
 */
export const build = (type, props, ...children) => {
  return { type, props, children };
};

/**
 * The old virtual DOM tree.
 * @type {Component}
 */
export let oldApp = App();

/**
 * Creates a real DOM node from a virtual DOM node.
 * @param {object|string} node - The virtual DOM node.
 * @returns {Node} The real DOM node.
 */
export const createElement = (node) => {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  if (typeof node === "object" && node !== null && "type" in node) {
    const el = document.createElement(node.type);
    node.children.map(createElement).forEach(el.appendChild.bind(el));
    for (const prop in node.props) {
      if (prop.startsWith("on")) {
        el.addEventListener(prop.slice(2).toLowerCase(), node.props[prop]);
      } else {
        el.setAttribute(prop, node.props[prop]);
      }
    }
    return el;
  }
  return document.createTextNode(String(node));
};

/**
 * Updates the real DOM to match the virtual DOM.
 */
const update = () => {
  const newApp = App();
  updateElement(root, newApp, oldApp, 0);
  oldApp = newApp;
};

/**
 * Performs an action and then updates the view.
 * @param {Function} action - The action to perform.
 */
export const updateView = (action) => {
  action();
  update();
};

/**
 * Updates a real DOM node to match a virtual DOM node.
 * @param {Node} parent - The parent of the real DOM node.
 * @param {object|string} newNode - The new virtual DOM node.
 * @param {object|string} oldNode - The old virtual DOM node.
 * @param {number} index - The index of the real DOM node in its parent's child list.
 */
const updateElement = (parent, newNode, oldNode, index = 0) => {
  if (!oldNode) {
    parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (isNodeDiff(newNode, oldNode)) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
};

/**
 * Checks if two virtual DOM nodes are different.
 * @param {object|string} node1 - The first virtual DOM node.
 * @param {object|string} node2 - The second virtual DOM node.
 * @returns {boolean} True if the nodes are different, false otherwise.
 */
const isNodeDiff = (node1, node2) => {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
};
