export default function validateSendMessage(values) {
  let errors = {};

  //Description Errors
  if (!values.messagebody) {
    errors.messagebody = "A message is required.";
  }

  //URL errors

  return errors;
}
