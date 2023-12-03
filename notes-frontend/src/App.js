import "./App.css";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import { useState } from "react";

function App() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  return (
    <>
      <section className="call-to-action">
        <h1>
          Why keeping everything in your mind when you can use:{" "}
          <span>NOTES</span>
        </h1>
        <p>
          Create, save, delete and edit all your notes, but not only that, you
          can categorize them by TODO or REMINDER, and search for words in all
          of your notes.
        </p>
      </section>
      <section className="form-container">
        {!isSignUpActive && <Login />}
        {!isSignUpActive && (
          <p>
            Dont have an Account?{" "}
            <button onClick={() => setIsSignUpActive(true)}>SIGN UP!</button>
          </p>
        )}
        {isSignUpActive && <Signup />}
        {isSignUpActive && (
          <p>
            Already have an Account?{" "}
            <button onClick={() => setIsSignUpActive(false)}>Login!</button>
          </p>
        )}
      </section>
    </>
  );
}

export default App;
