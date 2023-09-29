import { createElement, oldApp } from "./src/componentBuilder";
import "./style.css";

export const root = document.getElementById("root");
root.appendChild(createElement(oldApp));
