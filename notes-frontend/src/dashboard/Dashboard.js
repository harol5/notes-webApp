import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getNotes = async () => {
      try {
        const response = await axiosPrivate.get("/notes", {
          signal: controller.signal,
        });
        isMounted && setNotes(response.data);
      } catch (err) {
        console.log(err);
        navigate("/", { state: { from: location }, replace: true });
      }
    };
    getNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const logout = async () => {
    try {
      const response = await axiosPrivate.get("/logout");
      console.log(response);
      navigate("/", { state: { from: location }, replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(notes);
  return (
    <section>
      <header>
        <h1>dashboard</h1>
        <ul>
          <li>opction 1</li>
          <li>opction 2</li>
          <li>opction 3</li>
          <li>opction 4</li>
        </ul>
        <button onClick={logout}>log out</button>
      </header>
      <section>
        <ul>
          <li> post 1 </li>
          <li> post 2 </li>
          <li> post 3 </li>
          <li> post 4 </li>
          <li> post 5 </li>
          <li> post 6 </li>
          <li> post 7 </li>
          <li> post 8 </li>
        </ul>
      </section>
    </section>
  );
}

export default Dashboard;
