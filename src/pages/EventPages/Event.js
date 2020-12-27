import React, { useEffect, useState, useContext } from "react";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import EventItem from "../../components/Events/EventItem";

const Event = (props) => {
  const { user } = useContext(UserContext);
  const [event, setEvent] = useState(null);
  const eventId = props.match.params.eventId;
  const eventRef = firebase.db.collection("events").doc(eventId);

  useEffect(() => {
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
