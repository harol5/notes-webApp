import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Input from "../common/InputForm";
import InputPw from "../common/InputFormPw";
import axios from "../api/axios";
import {
  usernameValidation,
  passwordLoginValidation,
} from "../utils/inputValidations";
import "../styles/form.css";

function Login({ setCurrentForm }) {
  const { setAuth } = useAuth();

  //Utils for re-route after.
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  //Utils for form functionality.
  const [errMsg, setErrMsg] = useState("");
  const methods = useForm({ mode: "onTouched" });
  const onSubmit = methods.handleSubmit((data) => {
    axios
      .post("/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setAuth({ code: res.data.accessToken });
        navigate(from, { replace: true, state: "this is a test" });
        console.log("Login: axios res ok, setauth and navigate called!");
      })
      .catch((err) => {
        if (!err?.response) setErrMsg("No Server Response");
        else if (err.response?.status === 403)
          setErrMsg(
            "you have not confirmed your account, please check your email"
          );
        else if (err.response?.status >= 400)
          setErrMsg("Missing Username or Password!!");
        else console.log(err);
      });
    methods.reset();
  });

  return (
    <FormProvider {...methods}>
      {errMsg && <DisplayMessage message={errMsg} />}
      <form onSubmit={(e) => e.preventDefault()} noValidate className="form">
        <Input {...usernameValidation} />
        <InputPw
          {...passwordLoginValidation}
          isLoggin={true}
          setCurrentForm={setCurrentForm}
        />
        <button onClick={onSubmit}>Login</button>
      </form>
      <p>
        Dont have an Account?{" "}
        <button className="warnning" onClick={() => setCurrentForm("signup")}>
          SIGN UP!
        </button>
      </p>
    </FormProvider>
  );
}

function DisplayMessage({ message }) {
  return <h1 className="error">{message}</h1>;
}

export default Login;
