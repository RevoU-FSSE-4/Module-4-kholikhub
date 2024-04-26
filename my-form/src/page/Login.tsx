import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useContext, useEffect, useState } from "react";
import { Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../Context/ProfileContext";
import FormLogin from "./FormLogin";

const Login = () => {
  const [name, setName] = useState('')
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch ('https://library-crud-sample.vercel.app/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // localStorage.setItem(
        //   'users',
        //   JSON.stringify({
        //     name: response.data.name,
        //   }),
        // )

        // setName(response.data.name)
      })
      .catch((error) => console.error(error))
      }
    }, [])

    return (
    <>
    <div className="mt-5 flex justify-center ">
      <h1>Login</h1>
      <FormLogin/>
    </div>
    </>
    )
}
export default Login;