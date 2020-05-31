import React from "react";
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { add } from "ionicons/icons";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";

const News = (props) => {
  return (
    <IonPage>
      <SmallHeader title="BTWG Social App" />
      <IonContent fullscreen>
        <LargeHeader title="BTWG Social App" />
        <IonFab
          vertical="top"
          horizontal="end"
          slot="fixed"
          style={{ paddingBottom: "10px" }}
        >
          <IonFabButton color="success" routerLink={"/submit"}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default News;
