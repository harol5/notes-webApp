import { useFormContext } from "react-hook-form";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import "./inputForm.css";

function Input({ label, type, id, validation }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      {isInvalid && (
        <InputError
          message={inputError.error.message}
          key={inputError.error.message}
        />
      )}
      <input type={type} id={id} {...register(id, validation)} />
    </div>
  );
}

function InputError({ message }) {
  return <span className="error">{message}</span>;
}

export default Input;
