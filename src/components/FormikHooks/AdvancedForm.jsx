import { Formik, Form, Field } from 'formik';
import { advancedSchema } from './validation/schema';
import Debug from './Debug';
import CustomInput from './UI/CustomInput';
import CustomSelect from './UI/CustomSelect';
import CustomCheckBox from './UI/CustomCheckBox';

const initialValues = {
  username: '',
  jobType: '',
  acceptedTos: false,
};

const AdvancedForm = () => (
  <div
    className="mx-auto mt-5"
    style={{
      width: 600,
    }}
  >
    <h2>Advanced Form</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={advancedSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
        }, 3000);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <>
          <Form>
            <CustomInput name="username" type="text" placeholder="Username" />
            <CustomSelect name="jobType" type="text" placeholder="Job Type">
              <option value="">Select a job type</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="product">Product Manager</option>
              <option value="other">Other</option>
            </CustomSelect>
            <CustomCheckBox name="acceptedTos" placeholder="I accept the terms and conditions" />
            {/* <Field
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Email"
            />
            {errors.email && touched.email && errors.email}
            <Field
              type="password"
              name="password"
              className="form-control mb-3"
              placeholder="Password"
            />
            {errors.password && touched.password && errors.password} */}
            <div className="d-grid">
              <button className="btn btn-success" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </Form>
          <Debug />
        </>
      )}
    </Formik>
  </div>
);

export default AdvancedForm;
