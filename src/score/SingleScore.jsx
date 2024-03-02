import { Field, FieldArray, Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldChips, FieldInput } from "../component/FieldType";
import * as Yup from "yup";
import { Divider } from "primereact/divider";
import { ScoreService } from "./ScoreService";
import { useRef, useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import Loader from "../component/Loader";

const SingleScore = () => {
  const navigate = useNavigate();
  const data = useLocation();
  const scoreService = new ScoreService();
  const toast = useRef(null);
  const [singleData, setSingleData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.state.actionType === "edit") {
      setLoading(true);
      scoreService
        .singleScoreCard(data.state.id)
        .then((res) => {
          console.log(res);
          setSingleData(res);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: err[0]?.detail?.msg,
            life: 3000,
          });
        });
    }
  }, []);
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
          score: Yup.number()
            .nullable()
            .required("Score is required")
            .max(100, "Score is not greater than 100"),
        })
      )
      .required("Question is Required")
      .min(1, "Minimum one question required"),
  });

  const initialValues =
    data.state.actionType === "add"
      ? {
          title: "",
          questions: [
            {
              text: "",
              options: [],
              correct: [],
              score: 0,
            },
          ],
        }
      : { ...singleData };

  const handleSubmit = (values) => {
    setLoading(true);
    const reqData = {
      title: values.title,
      questions: values.questions.map((item) => ({
        ...item,
        score: Number(item.score),
        use_knowledge_base: false,
      })),
    };
    if (data.state.actionType === "add") {
      scoreService
        .scoreCardCreate(reqData)
        .then((res) => {
          setLoading(false);
          console.log(res);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Score card created successfully",
            life: 3000,
          });
        })
        .catch((error) => {
          setLoading(false);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: error[0]?.detail?.msg,
            life: 3000,
          });
        });
    } else {
      scoreService
        .singleScoreCardUpdate(data.state.id, reqData)
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Score card updated successfully",
            life: 3000,
          });
        })
        .catch((error) => {
          setLoading(false);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: error[0]?.detail?.msg,
            life: 3000,
          });
        });
    }
  };
  return (
    <>
      {loading && <Loader />}
      <Toast ref={toast} />
      <div className="grid">
        <div className="col-12 flex justify-content-end">
          <Button
            label="Back"
            icon="pi pi-arrow-left"
            onClick={() => {
              navigate("/");
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
                              <div key={index}>
                                <div className="flex col-12">
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
                                          // value={
                                          //   values.questions[index].score ===
                                          //   null
                                          //     ? ""
                                          //     : Number(
                                          //         values.questions[index].score
                                          //       )
                                          // }
                                          keyfilter="pint"
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
                                <Divider align="center"></Divider>
                              </div>
                            ))}

                          <div className="grid">
                            <div className="col-12 md:col-3">
                              <h3>Total Score</h3>
                              {values?.questions?.reduce(
                                (accumulator, currentValue) =>
                                  accumulator + Number(currentValue.score),
                                0
                              )}
                              {values?.questions?.reduce(
                                (accumulator, currentValue) =>
                                  accumulator + Number(currentValue.score),
                                0
                              ) > 100 && (
                                <div>
                                  <small className="text-red-600">
                                    Total Score should not be greater than 100
                                  </small>
                                </div>
                              )}
                            </div>
                            <div className="col-12 md:col-9 ">
                              <div className="flex justify-content-end  gap-2">
                                <Button
                                  disabled={
                                    values?.questions?.reduce(
                                      (accumulator, currentValue) =>
                                        accumulator +
                                        Number(currentValue.score),
                                      0
                                    ) >= 100
                                      ? true
                                      : false
                                  }
                                  type="button"
                                  label="Add Questions"
                                  icon="pi pi-plus"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      text: "",
                                      options: [],
                                      correct: [],
                                      score: 0,
                                      use_knowledge_base: false,
                                    })
                                  }
                                />

                                <Button
                                  label="Submit"
                                  type="submit"
                                  className="w-2"
                                  disabled={
                                    values?.questions?.reduce(
                                      (accumulator, currentValue) =>
                                        accumulator +
                                        Number(currentValue.score),
                                      0
                                    ) === 100
                                      ? false
                                      : true
                                  }
                                />
                              </div>
                            </div>
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
