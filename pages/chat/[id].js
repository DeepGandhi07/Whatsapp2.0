import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}
export default Chat;

export async function getServerSideProps(context) {
  const ref = doc(db, "chats", context.query.id);

  // Prep the messages array for the chat

  const messagesRef = collection(ref, "messages");
  const msg = query(messagesRef, orderBy("timestamp", "asc"));
  const messagesRes = await getDocs(msg);

  const messages = messagesRes.docs
    .map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    })
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // Prep the users array for the chat
  const chatRes = await getDoc(ref);
  const chat = {
    ...chatRes.data(),
    id: chatRes.id,
  };
  console.log(chat, messages);
  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 97.4vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
