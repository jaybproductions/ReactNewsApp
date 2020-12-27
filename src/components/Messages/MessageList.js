import React, { useContext, useState, useEffect } from "react";
import firebase from "../../firebase";
import MessageItem from "./MessageItem";
import UserContext from "../../contexts/UserContext";
import { IonIcon, IonText, IonLoading } from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import uuidv4 from "uuid/v4";

const MessageList = (props) => {
  const [sentMessages, setSentMessages] = useState([]);
  const [recievedMessages, setRecievedMessages] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getSentMessages();
    getRecievedMessages();

    // eslint-disable-next-line
  }, [user]);

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
      {user ? (
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
                key={() => uuidv4}
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
          {recievedMessages.map((recieivedmessage, index) => (
            <>
              <MessageItem
                key={() => uuidv4}
                showCount={true}
                url={`/message/${recieivedmessage.id}`}
                message={recieivedmessage}
                index={index + 1}
              />
            </>
          ))}
        </>
      ) : (
        <IonLoading isOpen={!user} message="Loading..." />
      )}
    </>
  );
};

export default MessageList;
