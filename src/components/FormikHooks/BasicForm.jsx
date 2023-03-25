import { useRef } from "react";
import { useFormik } from "formik";
import { basicSchema } from "./validation/schema";
import isUndefined from "lodash/isUndefined";
import clsx from "clsx";
// import Debug from "@components/FormikHooks/Debug";
const initialValues = {
  email: "",
  age: "",
  password: "",
  confirmPassword: "",
};
const onSubmitHandler = (values, actions) => {
  console.log({
    values,
    actions,
  });
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    actions.resetForm();
  }, 3000);
};
//todo check ctx - we need an object to bind this handler to it
function FormikHooks() {
  const {
    isSubmitting,
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: onSubmitHandler,
    validationSchema: basicSchema,
  });
  const counter = useRef(0);
  counter.current++;
  console.log("counter.current", counter.current);

  return (
    <div
      className="mx-auto mt-5"
      style={{
        width: 600,
      }}
    >
			<h2 className="mb-3 text-center">Formik test form</h2>
      <form onSubmit={handleSubmit} autoComplete="off" action="#">
        <div className="mb-3">
          <label htmlFor="emailInput1" className="form-label">
            Email address
          </label>
          <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
            className={clsx("form-control", {
              "border border-danger":
                touched.email && !isUndefined(errors.email),
            })}
            id="emailInput1"
            title="Please enter a valid email address"
            placeholder="Enter email"
            aria-describedby="emailHelp"
          />
          {touched.email && errors.email && (
            <div id="emailHelp" className="form-text">
              {errors.email}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleAge1" className="form-label">
            Age
          </label>
          <input
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            name="age"
            type="number"
            className={clsx("form-control", {
              "border border-danger": touched.age && !isUndefined(errors.age),
            })}
            id="exampleAge1"
            title="Age should be between 0 and 120"
            aria-describedby="ageHelp"
            placeholder="Enter age"
          />
          {touched.age && errors.age && (
            <div id="ageHelp" className="form-text">
              {errors.age}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="examplePassword1" className="form-label">
            Password
          </label>
          <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            type="password"
            className={clsx("form-control", {
              "border border-danger":
                touched.password && !isUndefined(errors.password),
            })}
            id="examplePassword1"
            title="Password should be at least 8 characters long"
            aria-describedby="passwordHelp"
            placeholder="Enter password"
          />
          {touched.password && errors.password && (
            <div id="passwordHelp" className="form-text">
              {errors.password}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleConfirmPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            name="confirmPassword"
            type="password"
            className={clsx("form-control", {
              "border border-danger":
                touched.confirmPassword && !isUndefined(errors.confirmPassword),
            })}
            id="exampleConfirmPassword1"
            title="Confirm password should be the same as password"
            aria-describedby="confirmPasswordHelp"
            placeholder="Confirm password"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <div id="confirmPasswordHelp" className="form-text">
              {errors.confirmPassword}
            </div>
          )}
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormikHooks;
