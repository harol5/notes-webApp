import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../common/InputForm";
import axios from "../api/axios";
import { emailValidation } from "../utils/inputValidations";
import "../styles/form.css";

const ForgotPwd = ({ setCurrentForm }) => {
  const methods = useForm({ mode: "onTouched" });
  const [messageFromSever, setMsg] = useState({ type: "", message: "" });
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    axios
      .post("/forgot-pwd", data)
      .then((res) => {
        console.log(res);
        setMsg((prev) => {
          return {
            ...prev,
            type: "success",
            message: `${res.data.success}.`,
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
        <Input {...emailValidation} />
        <button onClick={onSubmit}>Create Account</button>
      </form>
      <p>
        Dont have an Account?{" "}
        <button className="warnning" onClick={() => setCurrentForm("signup")}>
          SIGN UP!
        </button>
      </p>
    </FormProvider>
  );
};

function DisplayMessage({ type, message }) {
  return <span className={type}>{message}</span>;
}

export default ForgotPwd;
