import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import Card from "../common/Card";
import NoteModal from "../common/NoteModal";
import "../styles/dashboard.css";

function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const navigate = useNavigate();
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
        console.log(err.response.status);
      }
    };
    getNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const signOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  let [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addNote = () => {
    console.log("note added");
  };

  return (
    <section className="dashboard-container">
      <header>
        <h1>settings</h1>
        <ul>
          <li>
            <button onClick={openModal}>Add note</button>
          </li>
        </ul>
        <button onClick={signOut}>log out</button>
      </header>
      <section className="notes-container">
        {notes.map((note) => (
          <Card key={note.id} data={note} />
        ))}
      </section>
      <NoteModal isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
}

export default Dashboard;
