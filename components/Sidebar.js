import React from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
const sidebar = () => {
  return (
    <container>
      <Header>Sidebar</Header>
    </container>
  );
};

export default sidebar;
const container = styled.div``;
const Header = styled.div``;
const UserAvatar = styled(Avatar);
