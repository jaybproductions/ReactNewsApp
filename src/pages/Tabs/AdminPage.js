import React, { useContext } from "react";
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
  IonImg,
} from "@ionic/react";
import {
  personCircleOutline,
  mailOutline,
  personAddOutline,
  calendarOutline,
} from "ionicons/icons";
import { toast } from "../../helpers/toast";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import NavHeader from "../../components/Header/NavHeader";

const Admin = (props) => {
  const { user } = useContext(UserContext);

  const LogoutUser = async () => {
    try {
      await firebase.logout();
      props.history.push("/");
      toast("You are now logged out.");
    } catch (err) {
      console.error("Unable to log out", err);
      toast(err.message);
    }
  };
  return (
    <IonPage>
      <NavHeader title="Admin Area" />

      <IonContent fullscreen>
        {user ? (
          <>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    {" "}
                    {user.photoURL ? (
                      <>
                        <IonImg
                          src={user.photoURL}
                          style={{
                            width: "60px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            height: "60px",
                            position: "relative",
                            overflow: "hidden",
                            display: "inline",
                            margin: "auto",
                          }}
                        />
                      </>
                    ) : (
                      <IonIcon
                        icon={personCircleOutline}
                        slot="start"
                      ></IonIcon>
                    )}
                    <IonLabel style={{ paddingLeft: "15px" }}>
                      <strong>{user.displayName}</strong>
                      <p>Username</p>
                    </IonLabel>
                    <IonButton
                      expand="block"
                      routerLink={"/edit-profile"}
                      color="primary"
                      fill="outline"
                    >
                      Edit Profile
                    </IonButton>
                  </IonItem>

                  <IonItem>
                    <IonIcon
                      icon={mailOutline}
                      slot="start"
                      style={{ paddingLeft: "15px" }}
                    ></IonIcon>
                    <IonLabel>
                      <strong>{user.email}</strong>
                      <p>Email Address</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon
                      icon={personCircleOutline}
                      slot="start"
                      style={{ paddingLeft: "15px" }}
                    ></IonIcon>
                    <IonLabel>
                      <strong>Users</strong>
                      <p>view all users of your Application</p>
                    </IonLabel>
                    <IonButton
                      expand="block"
                      routerLink={"/edit-profile"}
                      color="primary"
                      fill="outline"
                    >
                      View Users
                    </IonButton>
                  </IonItem>

                  <IonItem>
                    <IonIcon
                      icon={personAddOutline}
                      slot="start"
                      style={{ paddingLeft: "15px" }}
                    ></IonIcon>
                    <IonLabel>
                      <strong>View Requests</strong>
                      <p>Users that need approval</p>
                    </IonLabel>
                    <IonButton
                      expand="block"
                      routerLink={"/edit-profile"}
                      color="primary"
                      fill="outline"
                    >
                      View Requests
                    </IonButton>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon
                      icon={calendarOutline}
                      slot="start"
                      style={{ paddingLeft: "15px" }}
                    ></IonIcon>
                    <IonLabel>
                      <strong>Events</strong>
                      <p>view and add events</p>
                    </IonLabel>
                    <IonCol>
                      <IonButton
                        expand="block"
                        routerLink={"/add-event"}
                        color="primary"
                        fill="outline"
                      >
                        Add Event
                      </IonButton>
                      <IonButton
                        expand="block"
                        routerLink={"/events"}
                        color="primary"
                        fill="outline"
                      >
                        View Events
                      </IonButton>
                    </IonCol>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonRow>
              <IonCol></IonCol>
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
                  routerLink={"/login"}
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

export default Admin;
