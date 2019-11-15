import theme from "styled-theming";

// * Background colors
const headerBackgroundColor = theme("mode", {
  light: "#fff",
  dark: "#181a1b"
});

const backgroundColor = theme("mode", {
  light: "#f4f6f9",
  dark: "#222"
});

// * Text colors
const textColor = theme("mode", {
  light: "#000",
  dark: "#fff"
});

const textOnHoverColor = theme("mode", {
  light: "#000",
  dark: "#fff"
});

export default {
  headerBackgroundColor,
  backgroundColor,
  textColor,
  textOnHoverColor
};
