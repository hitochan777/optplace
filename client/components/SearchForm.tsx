import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ErrorMessage } from "./ErrorMessage";

interface Props {
  onSubmit: (origin: string, destionations: string[]) => Promise<void>;
  isLoading: boolean;
}

export const SearchForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
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
            <ErrorMessage name="origin" />
          </div>
          <Field
            className="width-100 round-border"
            name="origin"
            type="text"
            placeholder="Departing from"
          />
        </div>

        <div className="form-control">
          <div className="flex items-center flex-end">
            <ErrorMessage name="destinations" />
          </div>
          <Field
            className="width-100 round-border"
            name="destinations"
            as="textarea"
            rows={10}
            placeholder={"Destination A\nDestination B\nDestination C"}
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" disabled={isLoading}>{isLoading ? "Searching..." : "Search" }</button>
        </div>
      </Form>
    </Formik>
  );
};
