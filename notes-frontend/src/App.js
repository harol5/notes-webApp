import "./App.css";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import { useState } from "react";
import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

function App() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const { auth } = useAuth();

  console.log("root ", auth);

  return auth?.code ? (
    <Navigate to="/dashboard" replace />
  ) : (
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
        {!isSignUpActive && <Login setIsSignUpActive={setIsSignUpActive} />}
        {isSignUpActive && <Signup setIsSignUpActive={setIsSignUpActive} />}
      </section>
    </>
  );
}

export default App;
