import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import { ErrorMessage } from "./ErrorMessage";

interface Props {
  onSubmit: (origin: string, destionations: string[]) => Promise<void>;
  isLoading: boolean;
}

const useStepper = (initialStep = 1) => {
  const [step, setStep] = useState(initialStep);
  return {
    step,
    next: () => {
      if (step === 0) {
        return;
      }
      setStep((prevStep) => prevStep + 1);
    },
    back: () => {
      setStep((prevStep) => prevStep - 1);
    },
  };
};

export const SearchForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const { step, next, back } = useStepper(1);
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
      {({ validateField, errors }) => (
        <Form>
          <SwitchTransition>
            <CSSTransition key={step} classNames="fade" timeout={200}>
              <>
                {step === 1 && (
                  <>
                    <div className="form-control">
                      <Field
                        className="width-100 round-border"
                        name="origin"
                        type="text"
                        placeholder="Departing from"
                      />
                      <div className="flex items-center justify-center">
                        <ErrorMessage name="origin" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          validateField("origin");
                          if (!errors.origin) {
                            next();
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="form-control">
                      <Field
                        className="width-100 round-border"
                        name="destinations"
                        as="textarea"
                        rows={10}
                        placeholder={
                          "Destination A\nDestination B\nDestination C"
                        }
                      />
                      <div className="flex items-center justify-center">
                        <ErrorMessage name="destinations" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={back} disabled={isLoading}>
                        Back
                      </button>
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? "Searching..." : "Search"}
                      </button>
                    </div>
                  </>
                )}
              </>
            </CSSTransition>
          </SwitchTransition>
        </Form>
      )}
    </Formik>
  );
};
