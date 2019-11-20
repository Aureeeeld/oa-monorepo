import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "semantic-ui-react";

// * Other components
import ThemeToggler from "../ThemeToggler";

// * Store
import { logout } from "../../store/ducks/auth";

// * Styled components
import {
  AvatarStyle,
  ItemIcon,
  ItemText,
  DropdownDivider,
  DropdownItem,
  DropdownMenu
} from "./styled";

// * Query
const GET_USER_AVATAR_LINK = gql`
  query Avatar($discordId: String!) {
    userAvatarLink(id: $discordId)
  }
`;

// * Components
let Avatar = <AvatarStyle size="mini" avatar />;

const ProfileMenu = () => {
  // * Dispatch
  const dispatch = useDispatch();

  // * Selectors
  const discordId = useSelector(({ auth }) => auth.discordId);

  const { data } = useQuery(GET_USER_AVATAR_LINK, { variables: { discordId } });
  if (data)
    Avatar = <AvatarStyle size="mini" src={data.userAvatarLink} avatar />;

  return (
    <Dropdown trigger={Avatar} direction="left" pointing="top" icon={null}>
      <DropdownMenu>
        <Dropdown.Header>
          <ItemText>Thème</ItemText>
          <ThemeToggler />
        </Dropdown.Header>
        <DropdownDivider />
        <DropdownItem onClick={() => dispatch(logout())}>
          <ItemIcon name="logout" />
          <ItemText>Se déconnecter</ItemText>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileMenu;
