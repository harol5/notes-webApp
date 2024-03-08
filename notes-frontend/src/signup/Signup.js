import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../common/InputForm";
import InputPw from "../common/InputFormPw";
import axios from "../api/axios";
import {
  nameValidation,
  emailValidation,
  usernameValidation,
  passwordValidation,
} from "../utils/inputValidations";
import "../styles/form.css";

function Signup({ setCurrentForm }) {
  const methods = useForm({ mode: "onTouched" });
  const [messageFromSever, setMsg] = useState({ type: "", message: "" });
  const onSubmit = methods.handleSubmit((data) => {
    axios
      .post("/register", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setMsg((prev) => {
          return {
            ...prev,
            type: "success",
            message: `${res.data.success}. Please check your email to confirm your account!`,
          };
        });
        methods.reset();
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setMsg((prev) => {
            return {
              ...prev,
              type: "error",
              message: `${err.response.data.message}. Please try another one.`,
            };
          });
        }
        console.log(err);
      });
  });

  return (
    <FormProvider {...methods}>
      {messageFromSever && (
        <DisplayMessage
          type={messageFromSever.type}
          message={messageFromSever.message}
        />
      )}
      <form onSubmit={(e) => e.preventDefault()} noValidate className="form">
        <Input {...nameValidation} />

        <Input {...emailValidation} />

        <Input {...usernameValidation} />

        <InputPw {...passwordValidation} isLoggin={false} />

        <button onClick={onSubmit}>Create Account</button>
      </form>
      <p>
        Already have an Account?{" "}
        <button className="warnning" onClick={() => setCurrentForm("login")}>
          LOGIN!
        </button>
      </p>
    </FormProvider>
  );
}

function DisplayMessage({ type, message }) {
  return <span className={type}>{message}</span>;
}

export default Signup;
