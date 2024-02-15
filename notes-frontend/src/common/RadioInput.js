import { useFormContext } from "react-hook-form";
import "../styles/inputForm.css";

function RadioInput({ label, type, id, name }) {
  const { register } = useFormContext();
  return (
    <div className="">
      <input
        type={type}
        id={id}
        name={name}
        value={id}
        {...register(name)}
        checked
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default RadioInput;
