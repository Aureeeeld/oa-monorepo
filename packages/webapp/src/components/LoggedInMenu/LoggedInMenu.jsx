import React from "react";

// * Other components
import NotifMenu from "../NotifMenu";
import ProfileMenu from "../ProfileMenu";

// * Component
const LoggedInMenu = () => (
  <>
    <NotifMenu />
    <ProfileMenu />
  </>
);

export default LoggedInMenu;
