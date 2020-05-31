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
import UsersList from "../../components/Users/UsersList";

const Users = (props) => {
  return (
    <IonPage>
      <SmallHeader title="Brothers" />
      <IonContent fullscreen>
        <LargeHeader title="Brothers" />

        <UsersList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Users;
