import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const messagesSnapshot = collection(
    doc(db, "chats", router.query.id),
    "messages"
  );
  const q = query(messagesSnapshot, orderBy("timestamp", "asc"));
  // const docSnap = await getDocs(q);
  // const [messagesSnapshot] = useCollection(
  //   doc(db, "chats", router.query.id),
  //   "messages"
  // );

  const showMessage = () => {
    if (q) {
      return q.docs.map((message) => {
        <Message />;
      });
    }
  };
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Rec Email</h3>
          <p>Last Seen ...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {/* SHow MESSAGES*/}
        <EndOfMessage />
      </MessageContainer>
    </Container>
  );
}

export default ChatScreen;
const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div``;
const EndOfMessage = styled.div``;
