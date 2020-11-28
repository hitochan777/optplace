import React from "react";
import { ErrorMessage as FormikErrorMessage } from "formik";

interface Props {
  name: string;
}

export const ErrorMessage: React.FC<Props> = ({ name }) => (
  <FormikErrorMessage name={name}>
    {(errorMessage) => <span className="red">{errorMessage}</span>}
  </FormikErrorMessage>
);
