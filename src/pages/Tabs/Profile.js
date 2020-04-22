import React from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
} from "@ionic/react";
import { personCircleOutline, mailOutline } from "ionicons/icons";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import { toast } from "../../helpers/toast";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";

const Profile = (props) => {
  const { user } = React.useContext(UserContext);

  async function LogoutUser() {
    try {
      await firebase.logout();
      props.history.push("/");
      toast("You are now logged out.");
    } catch (err) {
      console.error("Unable to log out", err);
      toast(err.message);
    }
  }
  return (
    <IonPage>
      <SmallHeader title="Profile" />
      <IonContent fullscreen>
        <LargeHeader title="Profile" />
        {user ? (
          <>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.displayName}</strong>
                      <p>Username</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.email}</strong>
                      <p>Email Address</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/edit-profile"}
                  color="primary"
                  fill="outline"
                >
                  Edit Profile
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={LogoutUser}>
                  Log Out
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/register"}
                  color="primary"
                >
                  Sign Up
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/register"}
                  color="primary"
                  fill="outline"
                >
                  Log In
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
