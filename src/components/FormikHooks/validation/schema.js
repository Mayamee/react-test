import * as Yup from 'yup';

const passwordRules = {
  regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
  message:
    'Password must contain at least one uppercase, one lowercase, and one number and be at least 5 characters long',
};

export const basicSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  age: Yup.number('Age must be a number')
    .positive("Age can't be negative")
    .integer('Age must be an integer')
    .required('Age is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .matches(passwordRules.regex, {
      message: passwordRules.message,
    })
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const advancedSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  jobType: Yup.string()
    .oneOf(
      ['designer', 'developer', 'product', 'other'],
      'Job Type is invalid. Please select Job Type from the list or select'
    )
    .required('Job Type is required'),
  acceptedTos: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

console.log({ YupBasicSchema: basicSchema });
