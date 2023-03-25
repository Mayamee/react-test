import { useId } from "react";
import { useField } from "formik";
import clsx from "clsx";
const CustomCheckBox = ({ placeholder, ...props }) => {
	const id = useId();
  const [field, meta, helpers] = useField(props);
  console.log({
    field,
    meta,
    helpers,
  });
  return (
    <div className="mb-3">
      <input
        className={clsx("form-check-input", {
          "border border-danger": meta.touched && meta.error,
        })}
				id={id}
        type="checkbox"
        {...field}
        {...props}
      />
      <label
        className="d-inline-block ms-3"
				htmlFor={id}
        style={{
          userSelect: "none",
        }}
      >
        {placeholder}
      </label>
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomCheckBox;
