import { Field, FieldArray, Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { FieldChips, FieldInput } from "../component/FieldType";

const SingleScore = () => {
  const navigate = useNavigate();

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
                              <>
                                <div className="flex col-12" key={index}>
                                  <div className="col-9">
                                    <div className="grid">
                                      <div className="col-12">
                                        <div className="flex gap-2">
                                          <div className="mt-3">
                                            {index + 1}.
                                          </div>
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
                                          className="w-full"
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
                              </>
                            ))}
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
