import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import styled from "styled-components";
import tw from "tailwind.macro";

// * Theme
import { theme } from "../../shared";

const { headerBackgroundColor, textColor } = theme;

export const MenuWrapper = styled(Menu)`
  background-color: ${headerBackgroundColor}!important;
`;

export const StyledLink = styled(Link)`
  ${tw`no-underline text-gray-800`}

  &:active,
  &:hover,
  &:focus {
    ${tw`no-underline text-gray-800`}
  }
`;

export const Title = styled.h2`
  ${tw`pl-3 tracking-wider`}
  font-family: Kayak;
  color: ${textColor};
`;
