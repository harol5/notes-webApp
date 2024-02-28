import { useFormContext } from "react-hook-form";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import "../styles/inputForm.css";

function Textarea({ label, id, validation }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="textare-container">
      <label htmlFor={id}>
        <h1>{label}</h1>
      </label>
      {isInvalid && (
        <InputError
          message={inputError.error.message}
          key={inputError.error.message}
        />
      )}
      <textarea
        id={id}
        {...register(id, validation)}
        rows="8"
        placeholder="Write your thoughts here..."
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 white:bg-gray-700  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}

function InputError({ message }) {
  return <span className="error">*{message}</span>;
}

export default Textarea;
