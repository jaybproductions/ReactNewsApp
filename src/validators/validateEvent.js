export default function validateEvent(values) {
  let errors = {};

  //Description Errors
  if (!values.title) {
    errors.messagebody = "A message is required.";
  }

  //URL errors

  return errors;
}
