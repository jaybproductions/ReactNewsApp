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
  IonRouterLink,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import useForm from "../../hooks/useForm";
import validatePasswordReset from "../../validators/validatePasswordReset";
import firebase from "../../firebase";
import { toast } from "../../helpers/toast";

const INITIAL_STATE = {
  email: "",
};

const Forgot = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validatePasswordReset,
    handleResetPassword
  );

  const [busy, setBusy] = React.useState(false);

  async function handleResetPassword() {
    setBusy(true);
    const { email } = values;

    try {
      await firebase.resetPassword(email);
      toast("Check your email to reset password");
    } catch (err) {
      console.log("Password reset error", err);
      toast("Unable to reset password. Please try again.");
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Password Reset" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
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
        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Get Reset Link
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Forgot;
