import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import Card from "../common/Card";
import NoteModal from "../common/NoteModal";
import "../styles/dashboard.css";
import DeleteNoteModal from "../common/DeleteNoteModal";

function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState([]);
  const [isOpenAddNoteModal, setIsOpenAddNoteModal] = useState(false);
  const [isOpenDeleteNoteModal, setIsOpenDeleteNoteModal] = useState(false);
  const [noteId, setNoteId] = useState();

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
      }
    };
    getNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [newNote]);

  const signOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const openModalAddNote = () => {
    setIsOpenAddNoteModal(true);
  };

  const closeModalAddNote = () => {
    setIsOpenAddNoteModal(false);
  };

  const openModalDeleteNote = (id) => {
    setIsOpenDeleteNoteModal(true);
    setNoteId(id);
  };

  const closeModalDeleteNote = () => {
    setIsOpenDeleteNoteModal(false);
  };

  const deleteNoteHandler = (id) => {
    console.log(id);
    const deleteNote = async () => {
      try {
        await axiosPrivate.delete(`/notes/${id}`);
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      } catch (err) {
        console.log(err);
      }
    };
    deleteNote();
  };

  return (
    <section className="dashboard-container">
      <header>
        <h1>settings</h1>
        <ul>
          <li>
            <button onClick={openModalAddNote}>Add note</button>
          </li>
        </ul>
        <button onClick={signOut}>log out</button>
      </header>
      <section className="notes-container">
        {notes.map((note) => (
          <Card key={note.id} data={note} onDelete={openModalDeleteNote} />
        ))}
      </section>
      <NoteModal
        isOpen={isOpenAddNoteModal}
        closeModal={closeModalAddNote}
        setNewNote={setNewNote}
      />
      <DeleteNoteModal
        isOpen={isOpenDeleteNoteModal}
        noteId={noteId}
        closeModal={closeModalDeleteNote}
        notes={notes}
        setNotes={setNotes}
      />
    </section>
  );
}

export default Dashboard;
