import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormType {
  origin: string;
  destinations: string;
}

interface Props {
  onSubmit: (origin: string, destionations: string[]) => Promise<void>;
}

export const SearchForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ origin: "", destinations: "" }}
      validationSchema={Yup.object({
        origin: Yup.string().required("required"),
        destinations: Yup.string().required("required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const { origin, destinations } = values;
        const destArray = destinations.split("\n");
        try {
          await onSubmit(origin, destArray);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Form>
        <div className="form-control">
          <div className="flex items-center flex-end">
            <ErrorMessage name="origin">{(errorMessage) => <span className="red">{errorMessage}</span>}</ErrorMessage>
          </div>
          <Field className="width-100 round-border" name="origin" type="text" placeholder="Departing from"/>
        </div>

        <div className="form-control">
          <div className="flex items-center flex-end">
            <ErrorMessage name="destinations">{(errorMessage) => <span className="red">{errorMessage}</span>}</ErrorMessage>
          </div>
          <Field className="width-100 round-border" name="destinations" as="textarea" placeholder="Destinations"/>
        </div>
        <div className="flex justify-center">
          <button type="submit">Search</button>
        </div>
      </Form>
    </Formik>
  );
};
