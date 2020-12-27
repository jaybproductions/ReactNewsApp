import React from "react";
import {
  IonPage,
  IonContent,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import { toast } from "../../helpers/toast";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import validateSignup from "../../validators/validateSignup";

const INITIAL_STATE = {
  name: "",
  url: "",
  image: null,
  email: "",
  password: "",
  photoURL: "",
};

const Signup = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateSignup,
    authenticateUser
  );

  const [busy, setBusy] = React.useState(false);

  async function authenticateUser() {
    setBusy(true);
    const { name, email, password, photoURL } = values;

    try {
      await firebase.register(name, email, password, photoURL);

      toast("You have signed up succsessfully!");
      props.history.push("/profile");
    } catch (err) {
      toast(err.message);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Sign Up" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            name="name"
            type="text"
            required
            value={values.name}
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="text"
            required
            value={values.email}
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            type="password"
            required
            value={values.password}
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>

        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Sign Up
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
