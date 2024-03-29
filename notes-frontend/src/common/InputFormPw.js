import { useFormContext } from "react-hook-form";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import "../styles/inputForm.css";
import { useState } from "react";

function Input({ label, type, id, validation, isLoggin, setCurrentForm }) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="input-container">
      <div className="flex items-center justify-between ">
        <label htmlFor={id}>
          <h1>{label}</h1>
        </label>
        {isLoggin && (
          <p
            className="text-gray-700 cursor-pointer"
            onClick={() => setCurrentForm("forgotPwd")}
          >
            forgot?
          </p>
        )}
      </div>
      {isInvalid && (
        <InputError
          message={inputError.error.message}
          key={inputError.error.message}
        />
      )}
      <div className="input-pwd-wrapper">
        <input
          type={isVisible ? "text" : type}
          id={id}
          {...register(id, validation)}
        />
        <svg
          onClick={() => setIsVisible(!isVisible)}
          className={isVisible ? "eye-icon actived" : "eye-icon"}
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
            fillRule="nonzero"
          />
        </svg>
      </div>
    </div>
  );
}

function InputError({ message }) {
  return <span className="error">*{message}</span>;
}

export default Input;
