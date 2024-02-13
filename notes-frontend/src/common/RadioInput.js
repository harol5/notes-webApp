import { useFormContext } from "react-hook-form";
import "../styles/inputForm.css";

function RadioInput({ label, type, id, name, validation }) {
  const { register } = useFormContext();
  return (
    <div className="input-container">
      <div>
        <input
          type={type}
          id={id}
          name={name}
          value={id}
          {...register(name, validation)}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
}

export default RadioInput;
