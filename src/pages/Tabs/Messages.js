import React from "react";
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import { add } from "ionicons/icons";
import MessageList from "../../components/Messages/MessageList";

const Messages = (props) => {
  return (
    <IonPage>
      <SmallHeader title="Messages" />
      <IonContent fullscreen>
        <LargeHeader title="Messages" />
        <IonFab
          vertical="top"
          horizontal="end"
          slot="fixed"
          style={{ paddingBottom: "10px" }}
        >
          <IonFabButton color="success" routerLink={"/new-message"}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <MessageList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Messages;
