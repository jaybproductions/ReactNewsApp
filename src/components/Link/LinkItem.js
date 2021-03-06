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
  heartOutline,
} from "ionicons/icons";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const LinkItem = ({ link, index, showCount, url, browser, subject }) => {
  return (
    <IonCard routerLink={url} onClick={browser} button>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            {link.postedBy.profilePic ? (
              <>
                <img
                  src={link.postedBy.profilePic}
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
                    paddingRight: "5px",
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
                    paddingLeft: "10px",
                  }}
                >
                  <strong>{link.postedBy.name}</strong> {}
                </IonText>
                <br></br>
              </p>

              <div className="ion-padding-vertical ion-text-wrap">
                <strong style={{ fontSize: "1rem", paddingLeft: "10px" }}>
                  {link.description}
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
                  icon={heartOutline}
                  style={{
                    verticalAlign: "middle",
                  }}
                />{" "}
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  {link.voteCount} Like(s)
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
                  {formatDistanceToNow(link.created)}
                </IonText>
                {link.comments.length > 0 && (
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
                      {link.comments.length} comments
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

export default LinkItem;
