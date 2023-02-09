import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export const Chat = ({ id, users }) => {
  return (
    <Container>
      <UserAvatar />
      <p>Recipient Email</p>
    </Container>
  );
};
export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
