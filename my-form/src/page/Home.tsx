import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import "./Home.css";
import { useState } from "react";
import { Input, Typography } from "antd";

const { Text } = Typography;
// import { useState } from "react";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(5, "Too short!")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

function Home() {
  const [page, setPage] = useState<number>(1);
  const [fulfillOne, setFulfillOne] = useState("");

  const handleSubmit = (values: FormData) => {
    alert(JSON.stringify(values, null, 10));
  };

  const handlePage1 = (props: FormikProps<FormData>) => {
    if (
      props.values.firstName &&
      props.values.lastName &&
      !props.errors.firstName &&
      !props.errors.lastName
    ) {
      setFulfillOne("");
      setPage(2);
    } else {
      setFulfillOne("Form One is not valid");
    }
  };

  return (
    <>
      <h1>Vite + React</h1>
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
                  <p>{fulfillOne}</p>
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    value={props.values.firstName}
                    name={"firstName"}
                    onChange={props.handleChange("firstName")}
                    status={props.errors.firstName && "error"}
                  />
                  {/* <Field id="firstName" name="firstName" placeholder="Jane" /> */}
                  <br />
                  {props.errors.firstName && (
                    <Text type="danger">{props.errors.firstName}</Text>
                  )}
                  <br />

                  <label htmlFor="lastName">Last Name</label>
                  <Field id="lastName" name="lastName" placeholder="Doe" />
                  <br />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="feedback"
                  />
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
              )}

              {page === 2 && (
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="jane@acme.com"
                    type="email"
                  />
                  <br />
                  <ErrorMessage
                    name="email"
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
                  <button type="submit">Save</button>
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
