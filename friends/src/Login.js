import React, { useState } from "react";
//import { axiosWithAuth } from "./axiosWithAuth";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = ({ touched, errors, isSubmitting }) => {
  //const [credentials, setCredentials] = useState();

  // login = e => {
  //   e.preventDefault();
  //   axiosWithAuth()
  //     .get("http://localhost:500/api/login", credentials)
  //     .then(res => {
  //       localStorage.setItem("token", res.data.token);
  //       this.props.history.push("/");
  //     });
  // };

  return (
    <Form>
      <div>
        <label>Name</label>
        <Field type="text" name="name" placeholder="Enter Name" />
        <p>{touched.name && errors.name}</p>
      </div>
      <div>
        <label>Password</label>
        <Field type="text" name="password" placeholder="Enter Password" />
        <p>{touched.password && errors.password}</p>
      </div>
      <button disabled={isSubmitting}>Submit</button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues({ name, password }) {
    return {
      name: name || "",
      password: password || ""
    };
  },

  handleSubmit({ values, resetForm, setErrors, setSubmitting, formikBag }) {
    if (values.name === "York Cook") {
      setErrors({ name: "Name already taken" });
    } else {
      axios
        .post("http://localhost:500/api/login", values)
        .then(res => {
          localStorage.setItem(localStorage.getItem("token"), res.data.token);
          formikBag.props.history.push("/profile");
          //   console.log(res);
          //   resetForm();
          //   setSubmitting(false);
          //   window.alert("Some response here");
        })
        .catch(err => {
          console.log(err.response.data);
          setSubmitting(false);
        });
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .max(20)
      .required("Name is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters long")
      .max(20)
      .required("Password is required")
  })
})(Login);
