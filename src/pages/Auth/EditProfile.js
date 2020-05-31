import React from "react";
import UserContext from "../../contexts/UserContext";
import { toast } from "../../helpers/toast";
import firebase from "../../firebase";
import useForm from "../../hooks/useForm";
import validateEditProfile from "../../validators/validateEditProfile";
import {
  IonPage,
  IonLoading,
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
  IonItem,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";

const EditProfile = (props) => {
  const { user, setUser } = React.useContext(UserContext);
  const INITIAL_STATE = {
    name: user && user.displayName,
    email: user && user.email,
    newPassword: "",
    currentPassword: "",
    url: user && user.photoURL,
  };

  const linkId = user && user.uid;

  const [image, setImage] = React.useState("");

  const [busy, setBusy] = React.useState(false);

  const {
    handleSubmit,
    handleChange,
    setValues,
    values,
    isSubmitting,
  } = useForm(INITIAL_STATE, validateEditProfile, authenticateuser);

  async function reauthenticate(email, password) {
    const credential = firebase.app.auth.EmailAuthProvider.credential(
      email,
      password
    );

    try {
      await user.reauthenticateWithCredential(credential);
      console.log("Reauthenticated");
    } catch (err) {
      console.log("reautherror", err);
      toast(err.message);
    }
  }

  async function updateProfileItems(name, email, password, url) {
    await user.updateProfile({
      displayName: name,
      photoURL: url,
    });
    await user.updateEmail(email);
    if (password) {
      await user.updatePassword(password);
    }
  }

  async function authenticateuser() {
    setBusy(true);
    const { name, email, currentPassword, newPassword } = values;
    try {
      await reauthenticate(user.email, currentPassword);
      await updateProfileItems(name, email, newPassword, user.photoUrl);
      const result = await firebase.login(
        email,
        newPassword || currentPassword
      );
      setValues({
        name: user && user.displayName,
        email: user && user.email,
        newPassword: "",
        currentPassword: "",
        url: user && user.photoUrl,
      });
      setUser(result.user);
      toast("You have updated your profile");
      props.history.push("/profile");
    } catch (err) {
      console.error("Could not update profile", err);
      toast(err.message);
    }
    setBusy(false);
  }

  function handleChangePic(e) {
    if (e.target.files[0]) {
      const imagefile = e.target.files[0];
      setImage(imagefile);
    }
  }

  function handleCreateUser() {
    if (!user) {
      console.log("Waiting to Connect...");
    } else {
      const newUser = {
        id: user.uid,
        name: user.displayName,

        email: user.email,
        emailVerified: user.emailVerified,

        created: Date.now(),
      };
      firebase.db.collection("users").doc(user.uid).set(newUser);
      console.log("User added to database");
    }
  }

  async function handleUpload() {
    handleCreateUser();
    const uploadTask = firebase.storage
      .ref(`users/${user.uid}/images/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
      },
      (error) => {
        //error function
        console.log(error);
      },
      () => {
        //complete function

        firebase.storage
          .ref(`users/${user.uid}/images`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            if (!user) {
              console.log("waiting to connect");
            } else {
              firebase.auth.currentUser.updateProfile({
                photoURL: url,
              });
              let userRef = firebase.db.collection("users").doc(user.uid);

              userRef.update({ profilePic: url });
              toast("Your Profile Picture has been upldated.");
            }
          });
      }
    );
  }

  return (
    <IonPage>
      <NavHeader title="Edit Profile" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        {user ? (
          <>
            <IonItem lines="full">
              <IonLabel position="floating">Username</IonLabel>
              <IonInput
                name="name"
                type="text"
                value={values.name}
                onIonChange={handleChange}
                required
              ></IonInput>
            </IonItem>

            <IonItem lines="full">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                name="email"
                type="text"
                value={values.email}
                onIonChange={handleChange}
                required
              ></IonInput>
            </IonItem>

            <IonItem lines="full">
              <IonLabel position="floating">New Password</IonLabel>
              <IonInput
                name="newPassword"
                type="password"
                value={values.newPassword}
                onIonChange={handleChange}
                required
              ></IonInput>
            </IonItem>

            <IonItem lines="full">
              <IonLabel position="floating">Current Password</IonLabel>
              <IonInput
                name="currentPassword"
                type="password"
                value={values.currentPassword}
                onIonChange={handleChange}
                required
              ></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="floating">
                Update Your Profile Picture
              </IonLabel>
              <div style={{ display: "block", paddingTop: "25px" }}>
                <input type="file" onChange={handleChangePic} />
                <IonButton onClick={handleUpload}>Upload</IonButton>
              </div>
            </IonItem>

            <div style={{ margin: "auto" }}>
              <IonItem>
                <IonLabel position="floating">
                  Your Current Profile Picture
                </IonLabel>
                {user.photoURL ? (
                  <img
                    style={{
                      width: "200px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      height: "200px",
                      position: "relative",
                      overflow: "hidden",
                      display: "inline",
                      margin: "auto",
                    }}
                    src={user.photoURL}
                  />
                ) : (
                  <img
                    style={{
                      width: "200px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      height: "200px",
                      position: "relative",
                      overflow: "hidden",
                      display: "inline",
                      margin: "auto",
                    }}
                    src={"http://via.placeholder.com/400x300"}
                  />
                )}
              </IonItem>
            </div>
            <IonRow>
              <IonCol>
                <IonButton
                  type="submit"
                  color="primary"
                  expand="block"
                  onclick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Save Profile
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

export default EditProfile;
