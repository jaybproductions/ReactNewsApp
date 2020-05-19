import React from "react";
import firebase from "../../firebase";
import EventItem from "../Events/EventItem";
import UserContext from "../../contexts/UserContext";

const EventsList = (props) => {
  const [events, setEvents] = React.useState([]);
  const isTrending = props.location.pathname.includes("trending");
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    const unsubscribe = getEvents();
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [isTrending]);

  function getEvents() {
    if (!user) {
      return console.log("waiting to connect");
    }
    return firebase.db
      .collection("events")

      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const events = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    setEvents(events);
  }

  return (
    <>
      {events.length > 0 && (
        <>
          {events.map((event, index) => (
            <>
              <EventItem
                key={event.id}
                url={`/event/${event.id}`}
                event={event}
                index={index + 1}
              />
            </>
          ))}
        </>
      )}
    </>
  );
};

export default EventsList;
