import React from "react";
import { Dropdown } from "semantic-ui-react";

// * Styled Components

import { NotifIconStyle, ItemText, DropdownItem, DropdownMenu } from "./styled";

// * Components
const NotifIcon = <NotifIconStyle name="bell" size="large" />;

const NotifMenu = () => (
  <Dropdown trigger={NotifIcon} direction="left" pointing="top" icon={null}>
    <DropdownMenu>
      <DropdownItem>
        <ItemText>Notification</ItemText>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

export default NotifMenu;
