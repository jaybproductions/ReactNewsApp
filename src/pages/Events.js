import React from "react";
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import NavHeader from "../components/Header/NavHeader";
import { add } from "ionicons/icons";
import EventsList from "../components/Events/EventsList";

const Events = (props) => {
  return (
    <IonPage>
      <NavHeader title="Events" />
      <IonContent fullscreen>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton color="success" href={"/add-event"}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <EventsList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Events;
