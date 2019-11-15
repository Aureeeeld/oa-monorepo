import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon, Image } from "semantic-ui-react";
import tw from "tailwind.macro";

// * Theme
import { theme } from "../../shared";

const { textOnHoverColor } = theme;

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
`;

export const AvatarStyle = styled(Image)`
  ${tw`mx-4`}

  &:hover,
  &:focus {
    box-shadow: rgb(227, 229, 237) 0px 0px 0px 4px;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

export const NotifIconStyle = styled(Icon)`
  &:hover,
  &:focus {
    color: ${textOnHoverColor};
  }
`;
