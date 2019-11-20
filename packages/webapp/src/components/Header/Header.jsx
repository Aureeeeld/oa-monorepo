import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Image, Menu } from "semantic-ui-react";
import io from "socket.io-client";

// * Other components
import LoggedInMenu from "../LoggedInMenu";

// * Assets
import logoDark from "../../assets/images/logo_dark.png";
import logoLight from "../../assets/images/logo_light.png";

// * Store
import { login, closeAuth } from "../../store/ducks/auth";

// * Styled components
import { MenuWrapper, StyledLink, Title } from "./styled";

// * Socket
const socket = io(process.env.REACT_APP_API_ENDPOINT);

// * Component
const Header = () => {
  // * Dispatch
  const dispatch = useDispatch();

  // * Selectors
  const mode = useSelector(({ theme }) => theme.mode);
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);

  // * Effect
  useEffect(() => {
    socket.on("user", user => {
      dispatch(closeAuth(user));
    });
  }, []);

  return (
    <MenuWrapper fixed="top" borderless size="large">
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
          <LoggedInMenu />
        ) : (
          <>
            <Button
              icon
              labelPosition="right"
              onClick={() => dispatch(login(socket))}
              color={mode === "dark" ? "grey" : ""}
            >
              Connexion
              <Icon name="discord" />
            </Button>
          </>
        )}
      </Menu.Item>
    </MenuWrapper>
  );
};

export default Header;
