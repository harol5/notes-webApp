import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Dashboard from "./dashboard/Dashboard";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./utils/RequireAuth";
import PersistLogin from "./utils/PersistLogin";
import VerificationPanel from "./verificationPanel/VerificationPanel";
import ResetPwd from "./resetPwd/ResetPwd";
import NotFound from "./404/404";

const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "/account-verified/:username",
    element: <VerificationPanel />,
  },
  {
    path: "/reset-pwd",
    element: <ResetPwd />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
