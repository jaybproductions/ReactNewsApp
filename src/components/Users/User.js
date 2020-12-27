import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonContent,
  IonText,
  IonItem,
} from "@ionic/react";
import { getSourceMapRange } from "typescript";
import firebase from "../../firebase";

const User = ({}) => {
  let { userId } = useParams();
  const userRef = firebase.db.collection("users").doc(userId);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUser();
  }, [userId]);

  const getUser = async () => {
    const document = await userRef.get();
    setUserData(document.data());
  };
  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonText>Name: {userData.name}</IonText>
            </IonItem>
            <IonItem>
              <IonText>
                Phone Number:{" "}
                {userData.phoneNumber || "User has not set a phone number"}
              </IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default User;
