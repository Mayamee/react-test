import { useId } from "react";
import { useField } from "formik";
import clsx from "clsx";
const CustomInput = ({ label, ...otherProps }) => {
  const id = useId();
  const [field, meta, helpers] = useField(otherProps);
  console.log({
    field,
    meta,
    helpers,
  });
  return (
    <div className="mb-3">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={clsx("form-control", {
          "border border-danger": meta.touched && meta.error,
        })}
        id={id}
        {...field}
        {...otherProps}
      />
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomInput;
