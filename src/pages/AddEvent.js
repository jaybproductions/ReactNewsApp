import React, { Component } from "react";
import {
  IonPage,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonCard,
  IonButton,
} from "@ionic/react";
import NavHeader from "../components/Header/NavHeader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import validateEvent from "../validators/validateEvent";
import useForm from "../hooks/useForm";

const AddEvent = (props) => {
  const [date, setDate] = React.useState("");
  const { user } = React.useContext(UserContext);
  const INITIAL_STATE = {
    date: new Date(),
    title: "",
    createdBy: {
      id: user && user.uid,
      name: user && user.displayName,
      created: Date.now(),
    },

    time: "",
    description: "",
  };
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateEvent,
    handleCreateEvent
  );
  function onChange(date) {
    setDate(date);
    console.log(date);
  }

  function handleCreateEvent() {
    if (!user) {
      props.history.push("/login");
    } else {
      const { title, createdBy, description, details } = values;
      const newEvent = {
        title,
        description,
        dateofevent: date.toString(),
        createdBy: {
          id: user.uid,
          name: user.displayName,
          profilePic: user.photoURL,
        },

        replies: [],
        created: Date.now(),
      };
      firebase.db.collection("events").add(newEvent);
      props.history.push("/admin");
    }
  }
  return (
    <IonPage>
      <NavHeader title="Events" />
      <IonContent>
        <center>
          <Calendar onChange={onChange} />
        </center>
        <IonCard>
          <IonItem style={{ paddingTop: "10px" }}>
            <IonLabel
              lines="full"
              style={{ fontSize: "24px", paddingTop: "10px" }}
            >
              Add a New Event
            </IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="floating">Event Title</IonLabel>
            <IonInput
              name="title"
              type="text"
              value={values.title}
              onIonChange={handleChange}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Date of Event</IonLabel>
            <p style={{ paddingTop: "10px" }}>{date.toString()}</p>
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="floating">Short Description of Event</IonLabel>
            <IonInput
              name="description"
              type="text"
              value={values.description}
              onIonChange={handleChange}
              required
            ></IonInput>
          </IonItem>

          <IonButton
            type="submit"
            color="primary"
            expand="block"
            onclick={handleCreateEvent}
          >
            Add Event
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AddEvent;
