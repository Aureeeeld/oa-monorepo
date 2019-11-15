import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Dropdown, Icon, Image, Menu } from "semantic-ui-react";
import io from "socket.io-client";

// * Assets
import logoDark from "../../assets/images/logo_dark.png";
import logoLight from "../../assets/images/logo_light.png";

// * Store
import { login, logout, closeAuth } from "../../store/ducks/auth";

// * Styled components
import { AvatarStyle, NotifIconStyle, StyledLink, Title } from "./styled";

// * Socket
const socket = io(process.env.REACT_APP_API_ENDPOINT);

// * Query
const GET_USER_AVATAR_LINK = gql`
  query Avatar($discordId: String!) {
    userAvatarLink(id: $discordId)
  }
`;

// * Components
let Avatar = <AvatarStyle size="mini" avatar />;

const NotifIcon = <NotifIconStyle name="bell" size="large" />;

const Header = () => {
  // * Dipatch
  const dispatch = useDispatch();

  // * Selectors
  const mode = useSelector(({ theme }) => theme.mode);
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const discordId = useSelector(({ auth }) => auth.discordId);

  const { data } = useQuery(GET_USER_AVATAR_LINK, { variables: { discordId } });
  if (data)
    Avatar = <AvatarStyle size="mini" src={data.userAvatarLink} avatar />;

  // * Effect
  useEffect(() => {
    socket.on("user", user => {
      dispatch(closeAuth(user));
    });
  }, []);

  return (
    <Menu fixed="top" borderless inverted={mode === "dark"} size="large">
      <Menu.Item>
        <Link to="/">
          <Image
            size="mini"
            src={mode === "dark" ? logoDark : logoLight}
            style={{ marginRight: "1.5em" }}
          />
        </Link>
        <StyledLink to="/">
          <Title>owassembly</Title>
        </StyledLink>
      </Menu.Item>

      <Menu.Item position="right">
        {isLoggedIn ? (
          <>
            <Dropdown
              trigger={NotifIcon}
              direction="left"
              pointing="top"
              icon={null}
            >
              <Dropdown.Menu>
                <Dropdown.Item>Notification</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown
              trigger={Avatar}
              direction="left"
              pointing="top"
              icon={null}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  icon="log out"
                  text="Se déconnecter"
                  onClick={() => dispatch(logout())}
                />
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Button
              icon
              labelPosition="right"
              onClick={() => dispatch(login(socket))}
            >
              Connexion
              <Icon name="discord" />
            </Button>
          </>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default Header;
