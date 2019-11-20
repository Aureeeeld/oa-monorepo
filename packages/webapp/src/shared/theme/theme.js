import theme from "styled-theming";
import { darken, lighten } from "polished";

// * Base color
const darkGrey = "#121212";

// ? Global
// * Background colors
const backgroundColor = theme("mode", {
  light: "#f4f6f9",
  dark: darkGrey
});

const headerBackgroundColor = theme("mode", {
  light: "#fff",
  dark: lighten(0.08, darkGrey)
});

// * Text colors
const textColor = theme("mode", {
  light: "#000",
  dark: "#fff"
});

const textOnHoverColor = theme("mode", {
  light: lighten(0.2, "#000"),
  dark: darken(0.1, "#fff")
});

// ? Specific
// * Dropdown
const dropdownBackgroundColor = theme("mode", {
  light: "#fff",
  dark: lighten(0.14, darkGrey)
});

const dropdownBorderColor = theme("mode", {
  light: "rgba(34,36,38,.15)",
  dark: "rgb(34,36,38)"
});

export default {
  headerBackgroundColor,
  backgroundColor,
  textColor,
  textOnHoverColor,
  dropdownBackgroundColor,
  dropdownBorderColor
};
