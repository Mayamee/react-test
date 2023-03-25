import {
  Formik,
  Field,
  Form,
  FieldArray,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import ErrorMessage from "./ErrrorMessage";
import Debug from "./Debug";
import { formikSchema } from "./schema/formikschema";

const initialValues = {
  friends: [
    {
      name: "",
      email: "",
    },
  ],
};

const Invitation = () => {
  return (
    <div className="container">
      <h1 className="text-center my-3">Invite friends</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={formikSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 3000);
        }}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => {
          console.log({
            values,
            errors,
            touched,
            isSubmitting,
          });
          return (
            <div
              style={{
                width: 600,
                margin: "0 auto",
                backgroundColor: "#eee",
                padding: "1rem",
              }}
            >
              <Form>
                <FieldArray name="friends">
                  {({ push, remove }) => (
                    <>
                      {values.friends &&
                        values.friends.length > 0 &&
                        values.friends.map((friend, index) => (
                          <div className="row my-2" key={index}>
                            <div className="col">
                              <Field name={`friends[${index}].name`}>
                                {({ field, form }) => (
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="Jane Doe"
                                  />
                                )}
                              </Field>
                              <ErrorMessage name={`friends[${index}].name`}>
                                {(msg) => (
                                  <div className="alert alert-danger py-1 my-2">
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>
                            <div className="col">
                              <Field
                                name={`friends[${index}].email`}
                                type="email"
                                placeholder="janedoe@example.com"
                              />
                              <ErrorMessage name={`friends[${index}].email`}>
                                {(msg) => (
                                  <div className="alert alert-danger py-1 my-2">
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>
                            <div className="col">
                              <button
                                onClick={() => remove(index)}
                                className="btn btn-primary"
                                type="button"
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}

                      <div className="row px-5 mt-3">
                        <button
                          onClick={() =>
                            push({
                              name: "",
                              email: "",
                            })
                          }
                          className="btn btn-danger t"
                          type="button"
                        >
                          Add Friend
                        </button>
                      </div>
                    </>
                  )}
                </FieldArray>
                <div className="row px-5 mt-2">
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Inviting..." : "Invite"}
                  </button>
                </div>
              </Form>
              <Debug />
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Invitation;
