import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import { useFormContext } from "react-hook-form";

function Fieldset({ children }) {
  const {
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, "category");
  const isInvalid = isFormInvalid(inputError);
  console.log(errors);
  return (
    <fieldset>
      {children}
      {isInvalid && (
        <InputError
          message={inputError.error.message}
          key={inputError.error.message}
        />
      )}
    </fieldset>
  );
}

function InputError({ message }) {
  return <span className="error">*{message}</span>;
}

export default Fieldset;
