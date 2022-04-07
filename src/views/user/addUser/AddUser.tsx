import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import './addUser.css';
// interface FormValues {
//   name: string;
//   username: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
//   phone: string;
//   type: number;
// }

const AddUser = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmedPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required').min(4, 'Must be 4 characters or more'),
      email: Yup.string()
        .required('Required')
        .matches(/^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          'Password must be 7-19 characters and contain at least one letter, one number and a special character'
        ),
      confirmedPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
      phone: Yup.string()
        .required('Required')
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Must be a valid phone number')
    }),
    onSubmit: (values) => {
      //   window.alert('Form submitted');
      console.log(values);
    }
  });
  return (
    <section>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <h1>Create User</h1>
        <span> Your name </span>
        <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Enter your name" />
        {formik.errors.name && <p className="errorMsg"> {formik.errors.name} </p>}
        <span> Email address </span>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
        />
        {formik.errors.email && <p className="errorMsg"> {formik.errors.email} </p>}
        <span> Password </span>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />
        {formik.errors.password && <p className="errorMsg"> {formik.errors.password} </p>}
        <span> Confirm Password </span>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
          placeholder="Confirm your password"
        />
        {formik.errors.confirmedPassword && <p className="errorMsg"> {formik.errors.confirmedPassword} </p>}
        <span> Phone number </span>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder="Enter your phone numbers"
        />
        {formik.errors.phone && <p className="errorMsg"> {formik.errors.phone} </p>}
        <button type="submit"> Continue </button>
      </form>
    </section>
  );
};

export default AddUser;
