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
        <div>
          <label htmlFor="origin">Source</label>
          <Field name="origin" type="text" />
          <ErrorMessage name="origin" />
        </div>

        <div>
          <label htmlFor="destinations">
            Destinations (Separated by newlines)
          </label>
          <Field name="destinations" as="textarea" />
          <ErrorMessage name="destinations" />
        </div>
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};
