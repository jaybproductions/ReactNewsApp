import React from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";

const LargeHeader = ({ title }) => {
  return (
    <IonHeader collapse="condense">
      <IonToolbar style={{ background: "#750b65" }} color="primary">
        <IonTitle size="large">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default LargeHeader;
