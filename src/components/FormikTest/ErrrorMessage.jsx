import { useContext } from "react";
import { FormikContext } from "formik";
import get from "lodash/get";
// const ErrrorMessageWithoutRenderProps = ({ name }) => {
//   const { errors, touched } = useContext(FormikContext);
//   return errors[name] && touched[name] ? (
//     <div className="alert alert-danger">{errors[name]}</div>
//   ) : null;
// };

const ErrorMessage = ({ name: path, children }) => {
  // name is friends[${index}].name or friends[${index}].email
  const { errors, touched } = useContext(FormikContext);
  const error = get(errors, path);
  const isTouch = get(touched, path);
  return error && isTouch ? children(error) : null;
};

export default ErrorMessage;
