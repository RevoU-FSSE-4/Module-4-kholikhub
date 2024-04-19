import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import "./Home.css";
import { useState } from "react";
import { Input, Typography } from "antd";
import Password from "antd/es/input/Password";


const { Text } = Typography;

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, "Too short!")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  dob: Yup.string()
  .matches(
    /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/,
    'Invalid date format. Please use dd-mm-yyyy format.'
  )
  .required('DOB is required'),

  streetAddress: Yup.string()
    .min(5, "Too short!")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  city: Yup.string()
    .min(2, "Too short!")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  state: Yup.string()
    .min(3, "Too short!")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  zipCode: Yup.string()
    .matches(
      /(^\d{5}$)|(^\d{5}-\d{4}$)/,
    "invalid Zip Code format. Please use 67282 "
  ),

  userName: Yup.string()
    .min(5, "Too short!")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const initialValues = {
  fullName: "",
  email: "",
  dob: "",

  streetAddress:"",
  city:"",
  state:"",
  zipCode:"",

  userName:"",
  password:"",
};

interface FormData {
  fullName: string;
  email: string;
  dob: string;

  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;

  userName: string;
  password: string;
}

function Home() {
  const [page, setPage] = useState<number>(1);
  const [fulfillOne, setFulfillOne] = useState("");

  const handleSubmit = (values: FormData) => {
    alert(JSON.stringify(values, null, 10));
  };

  const handlePage1 = (props: FormikProps<FormData>) => {
    if (
      props.values.fullName &&
      props.values.email &&
      props.values.dob &&
      !props.errors.fullName &&
      !props.errors.email &&
      !props.errors.dob
    ) {
      setFulfillOne("");
      setPage(2);
    } else {
      setFulfillOne("Form One is not valid");
    }
  };

  const handlePage2 = (props: FormikProps<FormData>) => {
    if (
      props.values.streetAddress &&
      props.values.city &&
      props.values.state &&
      props.values.zipCode &&
      !props.errors.streetAddress &&
      !props.errors.city &&
      !props.errors.state &&
      !props.errors.zipCode
    ) {
      setFulfillOne("");
      setPage(3);
    } else {
      setFulfillOne("Form Two is not valid");
    }
  };

  return (
    <>
      <h1>REGISTER ACCOUNT</h1>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              {page === 1 && (
                <div>
                  <h2>PERSONAL INFORMATION</h2>
                  <div>
                    <p>{fulfillOne}</p>
                    <label htmlFor="fullname">Full Name</label>
                    <Input
                     value={props.values.fullName}
                     name={"fulltName"}
                     onChange={props.handleChange("fullName")}
                     status={props.errors.fullName && "error"}
                    />
                    <br />
                   {props.errors.fullName && (
                      <Text type="danger">{props.errors.fullName}</Text>
                   )}
                  
                    <label htmlFor="email">Email</label>
                      <Field
                        id="email"
                        name="email"
                        placeholder="zaza@gmail.com"
                        type="email"
                      />
                      <br />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="feedback"
                      />
                    
                    <label htmlFor="dob">Date of Birth (dd-mm-yyyy):</label>
                      <Field type="text" id="dob" name="dob" />
                      <ErrorMessage name="dob" component="div" className="feedback" />

                   <br />
                    <button
                      type="button"
                      onClick={() => {
                        handlePage1(props);
                      }}
                   >
                     Next
                    </button>
                  </div>
                </div>
              )}

              {page === 2 && (
                <div>
                  <h2>ADDRESS INFORMATION</h2>
                  <div>
                  <label htmlFor="streetAddress">Street Address</label>
                    <Input
                     value={props.values.streetAddress}
                     name={"streetAddress"}
                     onChange={props.handleChange("streetAddress")}
                     status={props.errors.streetAddress && "error"}
                    />
                    <br />
                   {props.errors.streetAddress && (
                      <Text type="danger">{props.errors.streetAddress}</Text>
                   )}

                  <label htmlFor="city">City</label>
                    <Input
                     value={props.values.city}
                     name={"city"}
                     onChange={props.handleChange("city")}
                     status={props.errors.city && "error"}
                    />
                    <br />
                   {props.errors.city && (
                      <Text type="danger">{props.errors.city}</Text>
                   )}

                  <label htmlFor="state">State</label>
                    <Input
                     value={props.values.state}
                     name={"state"}
                     onChange={props.handleChange("state")}
                     status={props.errors.state && "error"}
                    />
                    <br />
                   {props.errors.state && (
                      <Text type="danger">{props.errors.state}</Text>
                   )}

                  <label htmlFor="zipCode">Zip Code</label>
                    <Field
                      id="zipCode"
                      name="zipCode"
                      placeholder="67282"
                      type="zipCode"
                    />
                    <br />
                    <ErrorMessage
                      name="zipCode"
                      component="div"
                      className="feedback"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setPage(page - 1);
                      }}
                    >
                      Previous
                    </button>
                    <br />
                    <button
                      type="button"
                      onClick={() => {
                        handlePage2(props);
                      }}
                   >
                     Next
                    </button>
                  </div>
                </div>
              )}

              {page === 3 && (
                <div>
                  <h2>ACCOUNT INFORMATION</h2>
                  <div>

                  <label htmlFor="userName">User Name</label>
                    <Input
                     value={props.values.userName}
                     name={"userName"}
                     onChange={props.handleChange("userName")}
                     status={props.errors.userName && "error"}
                    />
                    <br />
                   {props.errors.userName && (
                      <Text type="danger">{props.errors.userName}</Text>
                   )}

                    <label htmlFor="password">Password</label>
                    <Field
                      id="password"
                      name="password"
                      placeholder=" KKkkk.123 "
                      type="password"
                    />
                    <br />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="feedback"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPage(page - 1);
                      }}
                    >
                      Previous
                    </button>
                    <br />
                    <button type="submit">Save</button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Home;
