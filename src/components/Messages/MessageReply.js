import React from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from "@ionic/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import MessageModal from "../Messages/MessageModal";
import { personCircleOutline } from "ionicons/icons";

const MessageReply = ({ replies, message, setMessage }) => {
  const { user } = React.useContext(UserContext);
  const [showModal, setShowModal] = React.useState(false);

  const postedByAuthUser = user && user.uid === replies.postedBy.id;

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleEditReply(messageText) {
    const messageRef = firebase.db.collection("messages").doc(message.id);
    messageRef.get().then((doc) => {
      if (doc.exists) {
        const previousReplies = doc.data().replies;
        const newReply = {
          postedBy: {
            id: user.uid,
            name: user.displayName,
            profilePic: user.photoURL,
          },
          created: Date.now(),
          text: messageText,
        };
        const updatedReplies = previousReplies.map((item) =>
          item.created === replies.created ? newReply : item
        );
        messageRef.update({ replies: updatedReplies });
        setMessage((prevState) => ({
          ...prevState,
          replies: updatedReplies,
        }));
      }
    });
    setShowModal(false);
  }

  return (
    <>
      <MessageModal
        isOpen={showModal}
        title="Edit Comment"
        sendAction={handleEditReply}
        closeAction={handleCloseModal}
        replies={replies}
      />
      <IonCard>
        <IonCardContent>
          <IonList lines="none">
            <IonItem>
              <IonLabel class="ion-text-wrap">
                <p
                  style={{
                    alignItems: "center",
                    fontSize: "0.8rem",
                    fontWeight: "strong",
                  }}
                >
                  {replies.postedBy.profilePic ? (
                    <>
                      <img
                        src={replies.postedBy.profilePic}
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
                  {replies.postedBy.name} {" | "}
                  {formatDistanceToNow(replies.created)}
                </p>
                <div className="ion-padding-vertical">{replies.text}</div>
                {postedByAuthUser && (
                  <IonButton size="small" onClick={() => setShowModal(true)}>
                    Edit
                  </IonButton>
                )}
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default MessageReply;
