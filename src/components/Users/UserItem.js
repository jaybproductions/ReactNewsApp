import React from "react";
import {
  IonCard,
  IonCardContent,
  IonList,
  IonBadge,
  IonLabel,
  IonIcon,
  IonText,
  IonItem,
} from "@ionic/react";
import { personCircleOutline, timeOutline } from "ionicons/icons";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const UserItem = ({ user, index, url, browser }) => {
  return (
    <IonCard routerLink={url} onClick={browser} button>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            {user.profilePic ? (
              <>
                <img
                  src={user.profilePic}
                  style={{
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    height: "60px",
                    position: "relative",
                    overflow: "hidden",
                    display: "inline",
                    margin: "auto",
                    paddingTop: "10px",
                    paddingRight: "10px",
                  }}
                />
              </>
            ) : (
              <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
            )}

            <IonLabel>
              <p
                style={{
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: "normal",
                }}
              >
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  {user.name} {}
                </IonText>
              </p>

              <div className="ion-padding-vertical ion-text-wrap">
                <strong style={{ fontSize: "1rem" }}>{user.email}</strong>
              </div>

              <p
                style={{
                  alignItems: "center",
                  fontSize: "0.8 rem",
                  fontWeight: "normal",
                }}
              >
                <IonIcon
                  icon={personCircleOutline}
                  style={{
                    verticalAlign: "middle",
                  }}
                />{" "}
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                ></IonText>
                {" | "}
                <IonIcon
                  icon={timeOutline}
                  style={{
                    verticalAlign: "middle",
                  }}
                />{" "}
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  {formatDistanceToNow(user.created)}
                </IonText>
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default UserItem;
