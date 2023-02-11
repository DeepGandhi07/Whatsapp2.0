import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile, InsertEmoticon } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import InsertEmoticonicon from "@material-ui/icons/EmojiEmotions";
import MicIcon from "@material-ui/icons/Mic";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const endOfMessageRef = useRef(null);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [Msg, setMsg] = useState([]);
  const [messagesSnapshot] = useCollection();
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "chats", router.query.id, "messages"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        const msg = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          msg.push({ ...doc.data(), id: doc.id });
        });
        setMsg(msg);
      }
    );
  }, [router.query.id]);
  const [recipientSnapshot] = useCollection(
    query(
      collection(db, "users"),
      where("email", "==", getRecipientEmail(chat.users, user))
    )
  );
  const ScrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const showMessage = () => {
    if (Msg.length > 0) {
      console.log(Msg);
      return Msg.map((message) => {
        return (
          <Message
            key={message.id}
            user={message.user}
            message={{
              ...message,
              timestamp: message.timestamp?.toDate().getTime(),
            }}
          />
        );
      });
    } else {
      return JSON.parse(messages).map((message) => {
        <Message key={message.id} user={message.user} message={message} />;
      });
    }
  };
  const sendMessage = (e) => {
    e.preventDefault();
    //update lastSeen message
    setDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
    // setDoc(
    //   doc(db, "chats", router.query.id),

    addDoc(collection(db, "chats", router.query.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
    ScrollToBottom();
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <Container>
      <Header>
        {/* <Avatar /> */}
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar src={recipientEmail[0]} />
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last Active :{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active ...</p>
          )}
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
        {showMessage()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonicon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} onClick={sendMessage}>
          Send Message
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;
const Container = styled.div`
  margin-bottom: 50px;
`;
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
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const EndOfMessage = styled.div``;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  position: fixed;
  padding: 10px;
  width: 70%;

  /* width: 100%; */
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
