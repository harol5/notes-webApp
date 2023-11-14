import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Dashboard from "./dashboard/Dashboard";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./utils/RequireAuth";

const router = createBrowserRouter([
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
