import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputPwd from "../common/InputFormPw";
import axios from "../api/axios";
import { passwordValidation } from "../utils/inputValidations";
import "../styles/form.css";
import "../styles/resetPassword.css";

const ResetPwd = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const methods = useForm({ mode: "onTouched" });
  const [messageFromSever, setMsg] = useState({ type: "", message: "" });
  const onSubmit = methods.handleSubmit((data) => {
    if (data.password !== data.reEnterPassword) {
      setMsg((prev) => {
        return {
          ...prev,
          type: "error",
          message: "passwords do not matched",
        };
      });
      return;
    }
    axios
      .post("/forgot-pwd/reset", { ...data, token: code })
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
      <section className="reset-pwd-form-wrapper">
        <section className="call-to-action reset-pwd">
          <h1 className="reset-pwd">
            <span>NOTES</span>
          </h1>
          <p>
            Please enter your new password, make sure both passwords entered
            inside each field are the same.
          </p>
        </section>
        {messageFromSever && (
          <DisplayMessage
            type={messageFromSever.type}
            message={messageFromSever.message}
          />
        )}
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          className="form reset-pwd"
        >
          <InputPwd {...passwordValidation} isLoggin={false} />
          <InputPwd
            {...passwordValidation}
            label="Re-enter password"
            id="reEnterPassword"
            isLoggin={false}
          />
          <button onClick={onSubmit}>Reset Password</button>
        </form>
      </section>
    </FormProvider>
  );
};

function DisplayMessage({ type, message }) {
  return <span className={type}>{message}</span>;
}

export default ResetPwd;
