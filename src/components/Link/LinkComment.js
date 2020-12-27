import React from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import CommentModal from "./CommentModal";
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const LinkComment = ({ comment, link, setLink }) => {
  const { user } = React.useContext(UserContext);
  const [showModal, setShowModal] = React.useState(false);

  const postedByAuthUser = user && user.uid === comment.postedBy.id;

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleEditComment(commentText) {
    const linkRef = firebase.db.collection("links").doc(link.id);
    linkRef.get().then((doc) => {
      if (doc.exists) {
        const previousComments = doc.data().comments;
        const newComment = {
          postedBy: {
            id: user.uid,
            name: user.displayName,
            profilePic: user.photoURL,
          },
          created: Date.now(),
          text: commentText,
        };
        const updatedComments = previousComments.map((item) =>
          item.created === comment.created ? newComment : item
        );
        linkRef.update({ comments: updatedComments });
        setLink((prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
      }
    });
    setShowModal(false);
  }

  function handleDeleteComment() {
    const linkRef = firebase.db.collection("links").doc(link.id);
    linkRef.get().then((doc) => {
      if (doc.exists) {
        const previousComments = doc.data().comments;
        const updatedComments = previousComments.filter(
          (item) => item.created !== comment.created
        );
        linkRef.update({ comments: updatedComments });
        setLink((prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
      }
    });
  }

  return (
    <>
      <CommentModal
        isOpen={showModal}
        title="Edit Comment"
        sendAction={handleEditComment}
        closeAction={handleCloseModal}
        comment={comment}
      />
      <IonCard>
        <IonCardContent>
          <IonList lines="none">
            <IonItem>
              {" "}
              {comment.postedBy.profilePic ? (
                <>
                  <img
                    src={comment.postedBy.profilePic}
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
              <IonLabel class="ion-text-wrap">
                <p
                  style={{
                    alignItems: "center",
                    fontSize: "0.8rem",
                    fontWeight: "normal",
                    paddingLeft: "10px",
                  }}
                >
                  {comment.postedBy.name} {" | "}
                  {formatDistanceToNow(comment.created)}
                </p>
                <div
                  className="ion-padding-vertical"
                  style={{ paddingLeft: "10px" }}
                >
                  {comment.text}
                </div>
                {postedByAuthUser && (
                  <IonButton size="small" onClick={() => setShowModal(true)}>
                    Edit
                  </IonButton>
                )}
                {postedByAuthUser && (
                  <IonButton
                    size="small"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    Delete
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

export default LinkComment;
