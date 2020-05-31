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
import NavHeader from "../../components/Header/NavHeader";
import { timeOutline } from "ionicons/icons";

import EventItem from "../../components/Events/EventItem";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const { Browser } = Plugins;

const Event = (props) => {
  const { user } = React.useContext(UserContext);
  const [event, setEvent] = React.useState(null);
  const eventId = props.match.params.eventId;
  const eventRef = firebase.db.collection("events").doc(eventId);

  React.useEffect(() => {
    getEvent();
    // eslint-disable-next-line
  }, [eventId]);

  function getEvent() {
    eventRef.get().then((doc) => {
      setEvent({ ...doc.data(), id: doc.id });
    });
  }

  function postedByAuthUser(event) {
    return user && user.uid === event.createdBy.id;
  }

  return (
    <IonPage>
      <NavHeader title="Event" option={event && postedByAuthUser(event)} />
      <IonContent>
        {event && (
          <>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-left">
                  <EventItem event={event} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Event;
