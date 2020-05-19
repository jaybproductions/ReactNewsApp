import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonTextarea,
} from "@ionic/react";

const MessageModal = ({ isOpen, title, sendAction, closeAction, replies }) => {
  const [messageText, setMessageText] = React.useState(
    replies ? replies.text : ""
  );

  function handleSendAction(item) {
    sendAction(item);
    setMessageText("");
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={closeAction}>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={closeAction}>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => handleSendAction(messageText)}>
              Send
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTextarea
          row={25}
          cols={25}
          placeholder="Your comment"
          value={messageText}
          onIonChange={(e) => setMessageText(e.target.value)}
        />
      </IonContent>
    </IonModal>
  );
};

export default MessageModal;
