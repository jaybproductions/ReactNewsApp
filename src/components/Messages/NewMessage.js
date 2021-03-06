import React, { useContext, useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonSearchbar,
  IonList,
} from "@ionic/react";
import SmallHeader from "../Header/SmallHeader";
import LargeHeader from "../Header/LargeHeader";
import UserContext from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import validateSendMessage from "../../validators/validateSendMessage";
import uuidv4 from "uuid/v4";

const INITIAL_STATE = {
  messagebody: "",
  subject: "",
  recipient: "",
};

const NewMessage = (props) => {
  const { user } = useContext(UserContext);
  const { handleSubmit, handleChange, values } = useForm(
    INITIAL_STATE,
    validateSendMessage,
    handleCreateMessage
  );
  const userRef = firebase.db.collection("users");
  const [usernameArr, setUsernameArr] = useState([]);

  function handleCreateMessage() {
    if (!user) {
      props.history.push("/login");
    } else {
      const { messagebody, subject, recipient } = values;
      const newMessage = {
        subject,
        messagebody,
        sender: {
          id: user.uid,
          name: user.displayName,
          profilePic: user.photoURL,
        },
        recipient: {
          id: uuidv4(),
          name: recipient,
        },
        replies: [],
        created: Date.now(),
      };
      firebase.db.collection("messages").add(newMessage);
      props.history.push("/messages");
    }
  }

  const handleGetUsers = async () => {
    const snapshot = await userRef.get();
    let userArr = [];
    snapshot.docs.forEach((user, index) => {
      userArr.push(user.data().name);
    });
    setUsernameArr(userArr);
    console.log(userArr);
  };
  return (
    <IonPage>
      <SmallHeader title="Send a new message" />
      <IonContent fullscreen>
        <LargeHeader title="Send a new message" />
        <IonItem lines="full">
          <IonLabel position="floating">
            Who are you sending this message to?
          </IonLabel>
          <IonSearchbar
            name="recipient"
            value={values.recipient}
            type="text"
            onIonChange={handleChange}
            required
            onClick={handleGetUsers}
          ></IonSearchbar>
          <IonList children={usernameArr}></IonList>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Subject</IonLabel>
          <IonInput
            name="subject"
            value={values.subject}
            type="text"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Message</IonLabel>
          <IonInput
            name="messagebody"
            value={values.messagebody}
            type="text"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
            >
              Submit
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default NewMessage;
