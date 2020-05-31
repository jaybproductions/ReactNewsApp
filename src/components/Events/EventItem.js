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
import {
  personCircleOutline,
  timeOutline,
  calendarOutline,
} from "ionicons/icons";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const EventItem = ({ event, index, url, browser }) => {
  return (
    <IonCard routerLink={url} onClick={browser} button>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <IonBadge
              style={{
                verticalAlign: "middle",
              }}
              slot="start"
            >
              <IonIcon
                icon={calendarOutline}
                style={{
                  verticalAlign: "middle",
                }}
              />
            </IonBadge>
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
                  {event.dateofevent} {}
                </IonText>
              </p>

              <div className="ion-padding-vertical ion-text-wrap">
                <strong style={{ fontSize: "1rem" }}>
                  {event.description}
                </strong>
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
                >
                  {event.createdBy.name}
                </IonText>
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
                  {formatDistanceToNow(event.created)}
                </IonText>
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default EventItem;
