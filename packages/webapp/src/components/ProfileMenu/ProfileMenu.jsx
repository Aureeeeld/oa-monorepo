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
const GET_USER_PROFILE_INFORMATION = gql`
  query UserProfileInformation($discordId: String!) {
    userProfileInformation(id: $discordId) {
      username
      avatar
    }
  }
`;

// * Components
let Avatar = <AvatarStyle round size="45" color="white" />;

const ProfileMenu = () => {
  // * Dispatch
  const dispatch = useDispatch();

  // * Selectors
  const discordId = useSelector(({ auth }) => auth.discordId);

  const { data } = useQuery(GET_USER_PROFILE_INFORMATION, {
    variables: { discordId }
  });

  if (data) {
    const { avatar, username } = data.userProfileInformation;
    if (avatar) Avatar = <AvatarStyle src={avatar} round size="45" />;
    else Avatar = <AvatarStyle name={username} round size="45" />;
  }

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
