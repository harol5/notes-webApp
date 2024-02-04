import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../common/InputForm";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import {
  nameValidation,
  emailValidation,
  usernameValidation,
  passwordValidation,
} from "../utils/inputValidations";
import "../styles/form.css";

function Signup({ setIsSignUpActive }) {
  const { setAuth } = useAuth();

  //Utils for re-route after.
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const methods = useForm({ mode: "onTouched" });
  const [errMsg, setErrMsg] = useState("");
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    axios
      .post("/register", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setAuth({ code: res.data.accessToken });
        navigate("/dashboard", { replace: true, state: "this is a test" });
      })
      .catch((err) => {
        console.log(err);
      });
    methods.reset();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} noValidate className="form">
        <Input {...nameValidation} />

        <Input {...emailValidation} />

        <Input {...usernameValidation} />

        <Input {...passwordValidation} />

        <button onClick={onSubmit}>Create Account</button>
      </form>
      <p>
        Already have an Account?{" "}
        <button onClick={() => setIsSignUpActive(false)}>LOGIN!</button>
      </p>
    </FormProvider>
  );
}

export default Signup;
