import { FormProvider, useForm } from "react-hook-form";
import Input from "../common/InputForm";
import axios from "axios";
import {
  usernameValidation,
  passwordLoginValidation,
} from "../utils/inputValidations";
import "../styles/form.css";

function CreateAccount() {
  const methods = useForm({ mode: "onTouched" });
  const onSubmit = methods.handleSubmit((data) => {
    axios
      .post("http://localhost:4500/login", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    methods.reset();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} noValidate className="form">
        <Input {...usernameValidation} />

        <Input {...passwordLoginValidation} />

        <button onClick={onSubmit}>Login</button>
      </form>
    </FormProvider>
  );
}

export default CreateAccount;
