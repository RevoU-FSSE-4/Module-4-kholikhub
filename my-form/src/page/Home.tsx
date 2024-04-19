import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import "./Home.css";
import { useState } from "react";
import { Input, Typography } from "antd";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


const { Text } = Typography;
// import { useState } from "react";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, "Too short!")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  // dob: Yup.date().dob("invalid date of birth").required("Required")
});

const initialValues = {
  fullName: "",
  email: "",
  // dob: "",
};

interface PersonalInformation {
  fullName: string;
  email: string;
  // dob: Date;
}

function Home() {
  const [page, setPage] = useState<number>(1);
  const [fulfillOne, setFulfillOne] = useState("");

  const handleSubmit = (values: PersonalInformation) => {
    alert(JSON.stringify(values, null, 10));
  };

  const handlePage1 = (props: FormikProps<PersonalInformation>) => {
    if (
      props.values.fullName &&
      !props.errors.fullName
    ) {
      setFulfillOne("");
      setPage(2);
    } else {
      setFulfillOne("Form One is not valid");
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
