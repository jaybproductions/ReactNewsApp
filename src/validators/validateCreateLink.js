export default function validateCreateLink(values) {
  let errors = {};

  //Description Errors
  if (!values.description) {
    errors.description = "A description is required.";
  } else if (values.description.length < 10) {
    errors.description = "The description must be at least 10 characters.";
  }

  //URL errors

  return errors;
}
