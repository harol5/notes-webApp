import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import Card from "../common/Card";
import "../styles/dashboard.css";

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
    <section className="dashboard-container">
      <header>
        <h1>dashboard</h1>
        <ul>
          <li>
            <button>opction 1</button>
          </li>
          <li>
            <button>opction 2</button>
          </li>
          <li>
            <button>opction 3</button>
          </li>
          <li>
            <button>Add note</button>
          </li>
        </ul>
        <button onClick={logout}>log out</button>
      </header>
      <section className="notes-container">
        {notes.map((note) => (
          <Card key={note.id} data={note} />
        ))}
      </section>
    </section>
  );
}

export default Dashboard;
