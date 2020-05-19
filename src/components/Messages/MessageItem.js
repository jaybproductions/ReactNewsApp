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
  chatbubbleEllipsesOutline,
} from "ionicons/icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const MessageItem = ({ message, index, url, browser, subject }) => {
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
            ></IonBadge>
            <IonLabel>
              <p
                style={{
                  alignItems: "center",
                  fontSize: "1.3rem",
                  fontWeight: "normal",
                }}
              >
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  {message.subject} {}
                </IonText>
              </p>
              {message.sender.profilePic ? (
                <>
                  <img
                    src={message.sender.profilePic}
                    style={{
                      width: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      height: "30px",
                      position: "relative",
                      overflow: "hidden",
                      display: "inline",
                      margin: "auto",
                      paddingTop: "10px",
                      paddingRight: "5px",
                    }}
                  />
                </>
              ) : (
                <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
              )}
              <p
                style={{
                  alignItems: "center",
                  fontSize: ".8rem",
                  fontWeight: "normal",
                  display: "inline",
                }}
              >
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  {message.sender.name}
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
                  {formatDistanceToNow(message.created)}
                </IonText>
                {message.replies.length > 0 && (
                  <>
                    {" | "}
                    <IonIcon
                      icon={chatbubbleEllipsesOutline}
                      style={{
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    <IonText
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {message.replies.length} Replies
                    </IonText>
                  </>
                )}{" "}
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default MessageItem;
