import styled from "styled-components";
import { Dropdown, Icon } from "semantic-ui-react";

// * Theme
import { theme } from "../../shared";

const {
  dropdownBackgroundColor,
  dropdownBorderColor,
  textColor,
  textOnHoverColor
} = theme;

export const NotifIconStyle = styled(Icon)`
  color: ${textColor};

  &:hover,
  &:focus {
    color: ${textOnHoverColor};
  }
`;

export const DropdownMenu = styled(Dropdown.Menu)`
  background-color: ${dropdownBackgroundColor}!important;
  border-color: ${dropdownBorderColor}!important;

  &:after {
    background-color: ${dropdownBackgroundColor}!important;
    border-color: ${dropdownBorderColor}!important;
  }
`;

export const DropdownItem = styled(Dropdown.Item)`
  border-color: ${textColor}!important;
`;

export const ItemText = styled.span`
  color: ${textColor}!important;
`;
