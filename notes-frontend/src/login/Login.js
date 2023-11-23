import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Input from "../common/InputForm";
import axios from "../api/axios";
import {
  usernameValidation,
  passwordLoginValidation,
} from "../utils/inputValidations";
import "../styles/form.css";

function Login() {
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const navigate = useNavigate();

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
      })
      .catch((err) => {
        if (!err?.response) setErrMsg("No Server Response");
        else if (err.response?.status >= 400)
          setErrMsg("Missing Username or Password");
        else console.log(err);
      });
    methods.reset();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} noValidate className="form">
        <Input {...usernameValidation} />
        <Input {...passwordLoginValidation} />
        {errMsg && <h1>{errMsg}</h1>}
        <button onClick={onSubmit}>Login</button>
      </form>
    </FormProvider>
  );
}

export default Login;
