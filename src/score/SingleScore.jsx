import { Field, FieldArray, Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { FieldChips, FieldInput } from "../component/FieldType";
import * as Yup from "yup";

const SingleScore = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too short! title")
      .required("Title is required"),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          text: Yup.string().required("Question is required"),
          options: Yup.array()
            .min(1, "Minimum one options required")
            .required("Options is required"),
          correct: Yup.array()
            .min(1, "Minimum one correct answear required")
            .required("Answear is required"),
          score: Yup.number().required("Score is required"),
        })
      )
      .required("Question is Required")
      .min(1, "Minimum one question required"),
  });
  const initialValues = {
    title: "New Scorecard",
    questions: [
      {
        text: "Example question text?",
        options: ["Option1", "Option2", "Option3"],
        correct: ["Option1", "Option3"],
        score: 100,
        use_knowledge_base: false,
      },
    ],
  };

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <div className="grid">
        <div className="col-12 flex justify-content-end">
          <Button
            label="Back"
            icon="pi pi-arrow-left"
            onClick={() => {
              navigate("/", { state: { actionType: "add" } });
            }}
          />
        </div>
        <div className="col-12">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ handleSubmit, values }) => (
              <Form onSubmit={handleSubmit}>
                <div className="grid gap-2 ">
                  <div className="col-12 md:col-3 ml-6">
                    <Field name={"title"} label="Name" component={FieldInput} />
                  </div>
                  <div className="col-12 ">
                    <FieldArray
                      name="questions"
                      render={(arrayHelpers) => (
                        <>
                          {values.questions &&
                            values.questions.map((item, index) => (
                              <div className="flex col-12" key={index}>
                                <div className="col-9">
                                  <div className="grid">
                                    <div className="col-12">
                                      <div className="flex gap-2">
                                        <div className="mt-3">{index + 1}.</div>
                                        <div className="w-full">
                                          <Field
                                            name={`questions.${index}.text`}
                                            label="Question"
                                            component={FieldInput}
                                            className="w-full"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12 ml-4">
                                      <Field
                                        name={`questions.${index}.options`}
                                        label="Options"
                                        component={FieldChips}
                                      />
                                    </div>
                                    <div className="col-12 ml-4">
                                      <Field
                                        name={`questions.${index}.correct`}
                                        label="Correct Answear"
                                        component={FieldChips}
                                      />
                                    </div>
                                    <div className="col-12 ml-4 md:col-3">
                                      <Field
                                        name={`questions.${index}.score`}
                                        label="Score"
                                        component={FieldInput}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-3 flex justify-content-end">
                                  <Button
                                    icon="pi pi-trash"
                                    rounded
                                    text
                                    severity="danger"
                                    aria-label="Cancel"
                                    onClick={() => arrayHelpers.remove(index)}
                                  />
                                </div>
                              </div>
                            ))}
                          <div className="col-12 flex justify-content-end mt-2 gap-2">
                            <Button
                              type="button"
                              label="Add Questions"
                              icon="pi pi-plus"
                              onClick={() =>
                                arrayHelpers.push({
                                  text: "",
                                  options: [],
                                  correct: [],
                                  score: null,
                                  use_knowledge_base: false,
                                })
                              }
                            />

                            <Button
                              label="Submit"
                              type="submit"
                              className="w-1"
                            />
                          </div>
                        </>
                      )}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SingleScore;
