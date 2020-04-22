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
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";

const EditProfile = (props) => {
  const { user, setUser } = React.useContext(UserContext);
  const INITIAL_STATE = {
    name: user && user.displayName,
    email: user && user.email,
    newPassword: "",
    currentPassword: "",
  };

  const {
    handleSubmit,
    handleChange,
    setValues,
    values,
    isSubmitting,
  } = useForm(INITIAL_STATE, validateEditProfile, authenticateuser);

  const [busy, setBusy] = React.useState(false);

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

  async function updateProfileItems(name, email, password) {
    await user.updateProfile({
      displayName: name,
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
      await updateProfileItems(name, email, newPassword);
      const result = await firebase.login(
        email,
        newPassword || currentPassword
      );
      setValues({
        name: user && user.displayName,
        email: user && user.email,
        newPassword: "",
        currentPassword: "",
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

  return (
    <IonPage>
      <NavHeader title="Edit Profile" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
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
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
