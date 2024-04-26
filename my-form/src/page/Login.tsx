import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useContext, useState } from "react";
import { Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../Context/ProfileContext";


const { Text } = Typography;

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(5, "Too short!")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const initialValues = {
  userName: "",
  password: "",
  email: "",
};

interface FormData {
  userName: string;
  password: string;
  email: string;
}

function Register() {
  const {setName } = useContext(ProfileContext);
  const [fulfillOne] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (values: FormData | any) => {
    alert(JSON.stringify(values, null, 10));
    setName(values.userName);
    navigate("/Dashboard");
  };

//   const handlePage = (props: FormikProps<FormData>) => {
//     if (
//       props.values.userName &&
//       props.values.password &&
//       props.values.email &&
//       !props.errors.userName &&
//       !props.errors.password &&
//       !props.errors.email
//     ) {
//     } else {
//       setFulfillOne("Form One is not valid");
//     }
//   };

  return (
    <>
      <div className="mt-5 flex justify-center ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <div className="border-2 p-6">
              <Form>
                  <div>
                    <h2 className="font-bold m-4 ">LOGIN ACCOUNT</h2>
                    <div className="">
                      <p>{fulfillOne}</p>
                    </div>
                    <div>
                      <label htmlFor="userName">User Name</label>
                    </div>
                    <div>
                      <Input
                        value={props.values.userName}
                        className="border-2 mb-5 mt-5 bg-slate-100 pr-20 pt-1 rounded "
                        name={"userName"}
                        onChange={props.handleChange("userName")}
                        status={props.errors.userName && "error"}
                      />
                      <br />
                      {props.errors.userName && (
                        <Text 
                        type="danger">
                        {props.errors.userName}
                        </Text>
                      )}
                    </div>
                    <div className=" mt-4">
                      <label htmlFor="password">Password</label>
                    </div>
                    <div>
                      <Field
                        className="border-2 mb-5 mt-5 bg-slate-100 pr-20 pt-1 rounded "
                        id="password"
                        name="password"
                        placeholder=" ******* "
                        type="password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="feedback"
                      />
                    </div>

                    <div className="mt-5">
                      <label className="" htmlFor="email">
                        Email
                      </label>
                      <div>
                        <Field
                          id="email"
                          name="email"
                          placeholder="  zaza@gmail.com"
                          type="email"
                          className="border-2 mt-5 bg-slate-100 pr-20 pt-1 rounded "
                        />
                        <ErrorMessage
                          
                          name="email"
                          component="div"
                          className="feedback mt-4"
                        />
                      </div>
                    </div>
                    <div className="pt-7">
                      <button
                        type="submit"
                        className="border-2 p-2 pr-9"
                        onClick={() => {
                          // navigate("/Login");
                        }}
                      >
                        LOGIN
                      </button>
                    </div>
                  </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Register;
