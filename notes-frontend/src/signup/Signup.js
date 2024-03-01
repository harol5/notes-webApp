import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../common/InputForm";
import axios from "../api/axios";
import {
  nameValidation,
  emailValidation,
  usernameValidation,
  passwordValidation,
} from "../utils/inputValidations";
import "../styles/form.css";

function Signup({ setIsSignUpActive }) {
  //Utils for re-route after.
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const methods = useForm({ mode: "onTouched" });
  const [messageFromSever, setMsg] = useState({ type: "", message: "" });
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    axios
      .post("/register", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMsg((prev) => {
          return {
            ...prev,
            type: "success",
            message: `${res.data.success}. Please check your email to confirm your account!`,
          };
        });
        methods.reset();
        // navigate("/dashboard", { replace: true, state: "this is a test" });
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

        <Input {...passwordValidation} />

        <button onClick={onSubmit}>Create Account</button>
      </form>
      <p>
        Already have an Account?{" "}
        <button className="warnning" onClick={() => setIsSignUpActive(false)}>
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
