import React from "react";
import firebase from "../../firebase";
import MessageItem from "./MessageItem";
import UserContext from "../../contexts/UserContext";
import { IonIcon, IonText } from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";

const MessageList = (props) => {
  const [sentMessages, setSentMessages] = React.useState([]);
  const [recievedMessages, setRecievedMessages] = React.useState([]);
  const isTrending = props.location.pathname.includes("trending");
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    const unsubscribe = getSentMessages();
    const unsubscribe2 = getRecievedMessages();
    return () => {
      unsubscribe();
      unsubscribe2();
    };
    // eslint-disable-next-line
  }, [isTrending]);

  function getSentMessages() {
    if (!user) {
      return console.log("waiting to connect");
    }
    return firebase.db
      .collection("messages")
      .where("sender.name", "==", `${user.displayName}`)
      .orderBy("created", "desc")
      .onSnapshot(handleSentSnapshot);
  }

  function handleSentSnapshot(snapshot) {
    const sentMessages = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setSentMessages(sentMessages);
  }

  function getRecievedMessages() {
    if (!user) {
      return console.log("waiting to connect");
    }
    return firebase.db
      .collection("messages")
      .where("recipient.name", "==", `${user.displayName}`)
      .orderBy("created", "desc")
      .onSnapshot(handleRecievedSnapshot);
  }

  function handleRecievedSnapshot(snapshot) {
    const recievedMessages = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setRecievedMessages(recievedMessages);
  }

  return (
    <>
      {sentMessages.length > 0 && (
        <>
          {" "}
          <div
            style={{
              fontSize: "1.3rem",
              paddingTop: "20px",
              paddingLeft: "50px",
            }}
          >
            <IonIcon
              icon={chatbubbleEllipsesOutline}
              style={{
                verticalAlign: "middle",
              }}
            />{" "}
            <IonText
              style={{
                verticalAlign: "middle",
              }}
            >
              Sent Messages
            </IonText>
          </div>
        </>
      )}{" "}
      {sentMessages.map((message, index) => (
        <>
          <MessageItem
            key={message.id}
            showCount={true}
            url={`/message/${message.id}`}
            message={message}
            index={index + 1}
          />
        </>
      ))}
      {recievedMessages.length > 0 && (
        <>
          <div
            style={{
              fontSize: "1.3rem",
              paddingTop: "20px",
              paddingLeft: "50px",
            }}
          >
            <IonIcon
              icon={chatbubbleEllipsesOutline}
              style={{
                verticalAlign: "middle",
              }}
            />{" "}
            <IonText
              style={{
                verticalAlign: "middle",
              }}
            >
              Recieved Messages
            </IonText>
          </div>
        </>
      )}{" "}
      {recievedMessages.map((message, index) => (
        <>
          <MessageItem
            key={message.id}
            showCount={true}
            url={`/message/${message.id}`}
            message={message}
            index={index + 1}
          />
        </>
      ))}
    </>
  );
};

export default MessageList;
