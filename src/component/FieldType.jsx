/* eslint-disable react/prop-types */
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";

export const FieldInput = ({ field, form: { touched, errors }, ...props }) => (
  <>
    <span className="p-float-label">
      <InputText {...field} {...props} className="w-full" />
      <label htmlFor={field.name}>{props.label}</label>
    </span>
    {touched[field.name] && errors[field.name] && (
      <small id={`${props.name}-help`} className="error">
        {errors[field.name]}
      </small>
    )}
  </>
);

export const FieldChips = ({ field, form: { touched, errors }, ...props }) => (
  <>
    <span className="p-float-label">
      <Chips {...field} {...props} className="w-full" />
      <label htmlFor={field.name}>{props.label}</label>
    </span>
    {touched[field.name] && errors[field.name] && (
      <small id={`${props.name}-help`} className="error">
        {errors[field.name]}
      </small>
    )}
  </>
);
