import * as yup from 'yup';

export const formikSchema = yup.object().shape({
  friends: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
    })
  ),
});
console.log({ formikSchema });
