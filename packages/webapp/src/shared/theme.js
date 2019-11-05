import theme from "styled-theming";

// * Background colors
export const headerBackgroundColor = theme("mode", {
  light: "#fff",
  dark: "#181a1b"
});

export const backgroundColor = theme("mode", {
  light: "#f4f6f9",
  dark: "#222"
});

// * Text colors
export const textColor = theme("mode", {
  light: "#000",
  dark: "#fff"
});

export default { headerBackgroundColor, backgroundColor, textColor };
