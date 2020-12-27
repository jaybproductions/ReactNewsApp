import React, { useContext, useState, useEffect } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import NavHeader from "../components/Header/NavHeader";
import { closeCircleOutline } from "ionicons/icons";
import LinkItem from "../components/Link/LinkItem";
import CommentModal from "../components/Link/CommentModal";
import LinkComment from "../components/Link/LinkComment";

const Link = (props) => {
  const { user } = useContext(UserContext);
  const [link, setLink] = useState(null);
  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection("links").doc(linkId);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getLink();
    // eslint-disable-next-line
  }, [linkId]);

  const getLink = () => {
    linkRef.get().then((doc) => {
      setLink({ ...doc.data(), id: doc.id });
    });
  };

  const handleAddVote = () => {
    if (!user) {
      props.history.push("/login");
    } else {
      linkRef.get().then((doc) => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          const voteCount = updatedVotes.length;
          linkRef.update({ votes: updatedVotes, voteCount });
          setLink((prevState) => ({
            ...prevState,
            votes: updatedVotes,
            voteCount: voteCount,
          }));
        }
      });
    }
  };

  const handleOpenModal = () => {
    if (!user) {
      props.history.push("/login");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    if (!user) {
      props.history.push("/login");
    } else {
      setShowModal(false);
    }
  };

  const handleAddComment = (commentText) => {
    if (!user) {
      props.history.push("/login");
    } else {
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
          const updatedComments = [...previousComments, newComment];
          linkRef.update({ comments: updatedComments });
          setLink((prevState) => ({
            ...prevState,
            comments: updatedComments,
          }));
        }
      });
    }
    setShowModal(false);
  };

  const handleDeleteLink = () => {
    linkRef
      .delete()
      .then(() => {
        console.log(`Document with ID ${link.id} deleted`);
      })
      .catch((err) => {
        console.error("Error deleting document", err);
      });
    props.history.push("/");
  };

  const postedByAuthUser = (link) => {
    return user && user.uid === link.postedBy.id;
  };

  return (
    <IonPage>
      <NavHeader
        title={link && link.description}
        option={link && postedByAuthUser(link)}
        icon={closeCircleOutline}
        action={handleDeleteLink}
      />
      <IonContent>
        <CommentModal
          isOpen={showModal}
          title="New Comment"
          sendAction={handleAddComment}
          closeAction={handleCloseModal}
        ></CommentModal>
        {link && (
          <>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                  <LinkItem link={link} />
                  <IonButton onClick={() => handleAddVote()} size="small">
                    Like
                  </IonButton>
                  <IonButton onClick={() => handleOpenModal()} size="small">
                    Comment
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            {link.comments.map((comment, index) => (
              <LinkComment
                key={index}
                comment={comment}
                link={link}
                setLink={setLink}
              />
            ))}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Link;
