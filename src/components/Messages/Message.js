import React from "react";
import firebase from "../../firebase";
import { Plugins } from "@capacitor/core";
import UserContext from "../../contexts/UserContext";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";
import NavHeader from "../Header/NavHeader";
import { timeOutline } from "ionicons/icons";

import MessageItem from "../Messages/MessageItem";
import MessageReply from "../Messages/MessageReply";
import MessageModal from "../Messages/MessageModal";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const { Browser } = Plugins;

const Message = (props) => {
  const { user } = React.useContext(UserContext);
  const [message, setMessage] = React.useState(null);
  const messageId = props.match.params.messageId;
  const messageRef = firebase.db.collection("messages").doc(messageId);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    getMessage();
    // eslint-disable-next-line
  }, [messageId]);

  function getMessage() {
    messageRef.get().then((doc) => {
      setMessage({ ...doc.data(), id: doc.id });
    });
  }

  function handleOpenModal() {
    if (!user) {
      props.history.push("/login");
    } else {
      setShowModal(true);
    }
  }

  function handleCloseModal() {
    if (!user) {
      props.history.push("/login");
    } else {
      setShowModal(false);
    }
  }

  function handleAddReply(messageText) {
    if (!user) {
      props.history.push("/login");
    } else {
      messageRef.get().then((doc) => {
        if (doc.exists) {
          const previousReplies = doc.data().replies;
          const newMessage = {
            postedBy: {
              id: user.uid,
              name: user.displayName,
              profilePic: user.photoURL,
            },
            created: Date.now(),
            text: messageText,
          };
          const updatedReplies = [newMessage, ...previousReplies];
          messageRef.update({ replies: updatedReplies });
          setMessage((prevState) => ({
            ...prevState,
            replies: updatedReplies,
          }));
        }
      });
    }
    setShowModal(false);
  }

  function postedByAuthUser(message) {
    return user && user.uid === message.sender.id;
  }

  async function openBrowser() {
    await Browser.open({
      url: message.url,
    });
  }

  return (
    <IonPage>
      <NavHeader
        title="Message"
        option={message && postedByAuthUser(message)}
      />
      <IonContent>
        <MessageModal
          isOpen={showModal}
          title="New Reply"
          sendAction={handleAddReply}
          closeAction={handleCloseModal}
        ></MessageModal>
        {message && (
          <>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-left">
                  <MessageItem message={message} />

                  <IonCard>
                    <IonCardContent>
                      <div
                        style={{
                          paddingBottom: "10px",
                          fontSize: "1rem",
                        }}
                      >
                        Message: {message && message.messagebody}
                      </div>
                      <IonIcon
                        icon={timeOutline}
                        style={{
                          verticalAlign: "middle",
                        }}
                      />{" "}
                      <IonText
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                        {formatDistanceToNow(message.created)}
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                  <center>
                    <IonButton onClick={() => handleOpenModal()} size="small">
                      Reply
                    </IonButton>
                  </center>
                </IonCol>
              </IonRow>
            </IonGrid>
            {message.replies.map((message, index) => (
              <MessageReply
                key={index}
                comment={message}
                replies={message}
                setMessage={setMessage}
              />
            ))}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Message;
