import { FormProvider, useForm } from "react-hook-form";
import Input from "../common/InputForm";
import {
  nameValidation,
  emailValidation,
  usernameValidation,
  passwordValidation,
} from "../utils/inputValidations";
import "../styles/form.css";

function Signup({ setIsSignUpActive }) {
  const methods = useForm({ mode: "onTouched" });
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
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
        Dont have an Account?{" "}
        <button onClick={() => setIsSignUpActive(false)}>SIGN UP!</button>
      </p>
    </FormProvider>
  );
}

export default Signup;
