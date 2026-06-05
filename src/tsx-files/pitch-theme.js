import { createContext } from "react";

export const LIGHT = {
  void: "#FFFFFF", obsidian: "#F9F7F5", charcoal: "#F0EDE8", ash: "#D5CCC0",
  ember: "#C8C0B4", smoke: "#C0B8AC",
  gold: "#8A6820", goldBright: "#7A5C18", goldDim: "#C0A060",
  cream: "#1A1410", creamDim: "#5A4838", creamMid: "#8A7868",
  green: "#2A6038", greenBright: "#2E7040",
  red: "#9A2818", amber: "#9A5818",
  purple: "#5038A0", steel: "#304868", strike: "#1A1410",
};

export const DARK = {
  void: "#050404", obsidian: "#0A0908", charcoal: "#141210", ash: "#1E1B18",
  ember: "#2A2520", smoke: "#2E2A26",
  gold: "#C8A050", goldBright: "#E0B860", goldDim: "#7A6030",
  cream: "#EDE0CC", creamDim: "#8A7A6A", creamMid: "#BEB0A0",
  green: "#3A6040", greenBright: "#5A9060",
  red: "#C04030", amber: "#C07030",
  purple: "#7060A0", steel: "#506080", strike: "#E8D0A0",
};
export const ThemeCtx = createContext(DARK);
