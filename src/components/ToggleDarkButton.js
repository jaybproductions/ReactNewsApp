import React from "react";
import { IonButton, IonItem, IonIcon, IonToggle, IonLabel } from "@ionic/react";
import { moon } from "ionicons/icons";
import "../theme/variables.css";

const ToggleDark = (props) => {
  const toggleDarkModeHandler = () => {
    document.body.classList.toggle("dark");
  };
  return (
    <IonItem>
      <IonIcon
        slot="start"
        icon={moon}
        style={{ marginRight: "10px", paddingLeft: "15px" }}
      />
      <IonLabel>
        <strong>Dark Mode</strong>
      </IonLabel>
      <IonToggle
        slot="end"
        name="darkMode"
        onIonChange={toggleDarkModeHandler}
      />
    </IonItem>
  );
};

export default ToggleDark;
