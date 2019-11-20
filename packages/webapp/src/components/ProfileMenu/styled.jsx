import styled from "styled-components";
import { Dropdown, Icon, Image } from "semantic-ui-react";
import tw from "tailwind.macro";

// * Theme
import { theme } from "../../shared";

const {
  backgroundColor,
  dropdownBackgroundColor,
  dropdownBorderColor,
  textColor
} = theme;

export const AvatarStyle = styled(Image)`
  ${tw`mx-4`}

  &:hover,
  &:focus {
    box-shadow: ${backgroundColor} 0px 0px 0px 4px;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
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

export const DropdownDivider = styled(Dropdown.Divider)`
  border-color: ${dropdownBorderColor}!important;
`;

export const ItemIcon = styled(Icon)`
  color: ${textColor}!important;
`;

export const ItemText = styled.span`
  color: ${textColor}!important;
`;
