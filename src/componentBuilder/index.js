import { root } from "../../main";
import App from "../App";
import { debounce, isNodeDiff } from "../helpers/common";
// eslint-disable-next-line no-unused-vars
import { ComponentType } from "../types";

/**
 * Creates a virtual DOM node.
 * @param {object} props - The properties of the DOM node.
 * @param {('a'|'abbr'|'address'|'area'|'article'|'aside'|'audio'|'b'|'base'|'bdi'|'bdo'|'blockquote'|'body'|'br'|'button'|'canvas'|'caption'|'cite'|'code'|'col'|'colgroup'|'data'|'datalist'|'dd'|'del'|'details'|'dfn'|'dialog'|'div'|'dl'|'dt'|'em'|'embed'|'fieldset'|'figcaption'|'figure'|'footer'|'form'|'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'head'|'header'|'hgroup'|'hr'|'html'|'i'|'iframe'|'img'|'input'|'ins'|'kbd'|'keygen'|'label'|'legend'|'li'|'link'|'main'|'map'|'mark'|'menu'|'menuitem'|'meta'|'meter'|'nav'|'noscript'|'object'|'ol'|'optgroup'|'option'|'output'|'p'|'param'|'picture'|'pre'|'progress'|'q'|'rp'|'rt'|'ruby'|'s'|'samp'|'script'|'section'|'select'|'small'|'source'|'span'|'strong'|'style'|'sub'|'summary'|'sup'|'table'|'tbody'|'td'|'textarea'|'tfoot'|'th'|'thead'|'time'|'title'|'tr'|'track'|'u'|'ul'|'var'|'video'|'wbr')} props.element - The type of the DOM node.
 * @param {string} props.className - The class of the DOM node.
 * @param {string} props.key - The key of the DOM node.
 * @param {...ComponentType} children - The children of the DOM node.
 * @returns {ComponentType} The virtual DOM node.
 */
export const build = ({ element, className, key, ...props }, ...children) => {
  return {
    element,
    key,
    className,
    props: { ...props, ...(key && { id: key }) },
    children,
  };
};

/**
 * The old virtual DOM tree.
 * @type {ComponentType}
 */
export let oldApp = App();

/**
 * Creates a real DOM node from a virtual DOM node.
 * @param {Object|string} node - The virtual DOM node.
 * @returns {Node} The real DOM node.
 */
export const createElement = (node) => {
  const { element, className, props, children } = node;
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  if (typeof node === "object" && node !== null && "element" in node) {
    /**
     * @type {HTMLElement}
     */
    const el = document.createElement(element);
    children.map(createElement).forEach(el.appendChild.bind(el));
    const classes = className?.split(" ") ?? [];
    classes.forEach((className) => {
      el.classList.add(className);
    });
    for (const prop in props) {
      if (prop.startsWith("on")) {
        el.addEventListener(prop.slice(2).toLowerCase(), props[prop]);
      } else {
        el.setAttribute(prop, props[prop]);
      }
    }
    return el;
  }
  return document.createTextNode(String(node));
};

/**
 * Updates the view.
 */
export const updateView = debounce(() => {
  const newApp = App();
  updateElement(root, newApp, oldApp, 0);
  oldApp = newApp;
}, 1);

/**
 * Updates the attributes of a real DOM node.
 * @param {HTMLElement} element - The DOM node that needs to have its attributes updated.
 * @param {Object} newProps - The new properties.
 * @param {Object} oldProps - The old properties.
 */
const updateAttributes = (element, newProps, oldProps) => {
  const allProps = { ...newProps, ...oldProps };

  for (const prop in allProps) {
    if (newProps[prop]) {
      element.setAttribute(prop, newProps[prop]);
    } else {
      element.removeAttribute(prop);
    }
  }
};

/**
 * Updates the event listeners of a real DOM node.
 * @param {HTMLElement} element - The DOM node that needs to have its event listeners updated.
 * @param {Object} newProps - The new properties.
 * @param {Object} oldProps - The old properties.
 */

const updateEvents = (element, newProps, oldProps) => {
  const allProps = { ...newProps, ...oldProps };

  for (const prop in allProps) {
    if (prop.startsWith("on")) {
      const eventName = prop.substring(2).toLowerCase();
      if (newProps[prop] !== oldProps[prop]) {
        if (newProps[prop]) {
          element.addEventListener(eventName, (event) => {
            event.stopPropagation();
            newProps[prop]();
          });
        } else {
          element.removeEventListener(eventName, (event) => {
            event.stopPropagation();
            oldProps[prop]();
          });
        }
      }
    }
  }
};

/**
 * Updates the classes of a real DOM node.
 * @param {HTMLElement} concernedNode - The DOM node that needs to have its classes updated.
 * @param {string} newClassName - The new classes.
 * @param {string} oldClassName - The old classes.
 */
const updateClassNames = (concernedNode, newClasses, oldClasses) => {
  if (!oldClasses || !newClasses) return;
  if (oldClasses !== newClasses) {
    const oldClassesArray = oldClasses ? oldClasses.split(" ") : [];
    const newClassesArray = newClasses ? newClasses.split(" ") : [];

    for (const newClassesElement of newClassesArray) {
      if (!oldClassesArray.includes(newClassesElement)) {
        concernedNode.classList.add(newClassesElement);
      }
    }

    for (const oldClassesElement of oldClassesArray) {
      if (!newClassesArray.includes(oldClassesElement)) {
        concernedNode.classList.remove(oldClassesElement);
      }
    }
  }
};

/**
 * Updates the children node of the real DOM by comparing the old virtual DOM child to the new one.
 * @param {HTMLElement} element - The parent DOM node of the children that needs to be updated.
 * @param {ComponentType[]} newChildren - The updated children.
 * @param {ComponentType[]} oldChildren - The old children.
 */
const updateChildren = (element, newChildren, oldChildren) => {
  const appendChild = (child) => {
    element.appendChild(createElement(child));
  };

  const removeChild = (key) => {
    const childToRemove = document.getElementById(key);
    childToRemove?.remove();
  };

  const updateChild = (newChild, oldChild, index) => {
    updateElement(element, newChild, oldChild, index);
  };

  const newLength = newChildren?.length;
  const oldLength = oldChildren?.length;

  if (oldLength === 0) {
    newChildren?.forEach(appendChild);
  }

  if (
    oldChildren?.some(({ key }) => Boolean(key)) &&
    newChildren?.some(({ key }) => Boolean(key))
  ) {
    if (isNodeDiff(newChildren, oldChildren) && newLength === oldLength) {
      newChildren?.forEach((newChild) => {
        const oldChild = oldChildren?.find(
          (oldChild) => oldChild.key === newChild.key
        );
        const concernedNode = document.getElementById(oldChild.key);
        updateClassNames(concernedNode, newChild.className, oldChild.className);
      });
    }

    if (newLength < oldLength) {
      const childrenToRemove = oldChildren
        ?.filter(
          (oldChild) =>
            !newChildren?.some((newChild) => newChild.key === oldChild.key)
        )
        .map(({ key }) => key);

      childrenToRemove.forEach(removeChild);
    }

    if (newLength > oldLength) {
      const missingChildren = newChildren?.filter(
        (newChild) =>
          !oldChildren?.some((oldChild) => oldChild.key === newChild.key)
      );

      missingChildren.forEach(appendChild);
    }
  } else {
    for (let i = 0; i < newLength || i < oldLength; i++) {
      if (isNodeDiff(newChildren[i], oldChildren[i])) {
        updateChild(newChildren[i], oldChildren[i], i);
      }
    }
  }

  // Remove excess child nodes
  while (element.childNodes.length > newLength) {
    element.removeChild(element.lastChild);
  }
};

/**
 * Updated the text content of a DOM node.
 * @param {HTMLElement} element - The DOM node containing the text.
 * @param {string} newText - The new text to be displayed.
 * @param {string} oldText - The old text that needs to be replaced.
 */
const updateTextContent = (element, newText, oldText) => {
  if (newText !== oldText) {
    element.textContent = newText;
  }
};

/**
 * Updates a real DOM node to match a virtual DOM node.
 * @param {Node} parent - The parent of the real DOM node.
 * @param {object|string} newNode - The new virtual DOM node.
 * @param {object|string} oldNode - The old virtual DOM node.
 * @param {number} index - The index of the real DOM node in its parent's child list.
 */
const updateElement = (parent, newNode, oldNode, index = 0) => {
  if (
    !parent ||
    typeof parent !== "object" ||
    typeof parent.childNodes[index] !== "object"
  ) {
    return;
  }

  if (!oldNode) {
    parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (isNodeDiff(newNode, oldNode)) {
    const {
      props: oldProps,
      className: oldClassName,
      children: oldChildren,
    } = oldNode;
    const {
      props: newProps,
      className: newClassName,
      children: newChildren,
    } = newNode;

    const element = parent.childNodes[index];

    if (typeof newNode === "string" || typeof oldNode === "string") {
      updateTextContent(element, newNode, oldNode);
    }
    updateAttributes(element, newProps, oldProps);
    updateEvents(element, newProps, oldProps);
    updateClassNames(element, newClassName, oldClassName);
    updateChildren(element, newChildren, oldChildren);
  }
};
