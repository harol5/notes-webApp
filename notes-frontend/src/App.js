import "./App.css";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import ForgotPwd from "./forgotPwd/ForgotPwd";
import { useState } from "react";
import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const { auth } = useAuth();

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
        {currentForm === "login" ? (
          <Login setCurrentForm={setCurrentForm} />
        ) : currentForm === "signup" ? (
          <Signup setCurrentForm={setCurrentForm} />
        ) : currentForm === "forgotPwd" ? (
          <ForgotPwd setCurrentForm={setCurrentForm} />
        ) : (
          <h1>internal error</h1>
        )}
      </section>
    </>
  );
}

export default App;
