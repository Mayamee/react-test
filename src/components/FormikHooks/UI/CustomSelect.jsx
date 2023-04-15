import { useId } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
const CustomSelect = ({ label, ...otherProps }) => {
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
      <select
        className={clsx('form-select', {
          'border border-danger': meta.touched && meta.error,
        })}
        id={id}
        {...field}
        {...otherProps}
      />
      {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
    </div>
  );
};

export default CustomSelect;
