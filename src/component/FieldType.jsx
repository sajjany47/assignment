/* eslint-disable react/prop-types */
import { getIn } from "formik";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";

export const FieldInput = ({ field, form: { touched, errors }, ...props }) => (
  <>
    <span className="p-float-label">
      <InputText
        {...field}
        {...props}
        className={`w-full  ${
          Boolean(getIn(errors, field.name)) &&
          getIn(touched, field.name) &&
          "p-invalid"
        }`}
      />
      <label htmlFor={field.name}>{props.label}</label>
    </span>
    {Boolean(getIn(errors, field.name)) && getIn(touched, field.name) && (
      <small className="text-red-600">{getIn(errors, field.name)}</small>
    )}
  </>
);

export const FieldChips = ({ field, form: { touched, errors }, ...props }) => (
  <>
    <span className="p-float-label">
      <Chips
        {...field}
        {...props}
        className={`w-full  ${
          Boolean(getIn(errors, field.name)) &&
          getIn(touched, field.name) &&
          "p-invalid"
        }`}
      />
      <label htmlFor={field.name}>{props.label}</label>
    </span>
    {Boolean(getIn(errors, field.name)) && getIn(touched, field.name) && (
      <small className="text-red-600">{getIn(errors, field.name)}</small>
    )}
  </>
);
