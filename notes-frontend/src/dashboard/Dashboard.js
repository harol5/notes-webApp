import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import Card from "../common/Card";
import NoteModal from "../common/NoteModal";
import "../styles/dashboard.css";
import DeleteNoteModal from "../common/DeleteNoteModal";
import EditNoteModal from "../common/EditNoteModal";

function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({});
  const [updatedNote, setUpdatedNewNote] = useState({});
  const [deletedNoteId, setNoteId] = useState();
  const [isOpenAddNoteModal, setIsOpenAddNoteModal] = useState(false);
  const [isOpenDeleteNoteModal, setIsOpenDeleteNoteModal] = useState(false);
  const [isOpenEditNoteModal, setIsOpenEditNoteModal] = useState(false);
  const [editNote, setEditNote] = useState();

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
  }, [newNote, updatedNote]);

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

  const openModalEditNote = (note) => {
    setIsOpenEditNoteModal(true);
    setEditNote(note);
  };

  const closeModalEditNote = () => {
    setIsOpenEditNoteModal(false);
  };

  const openModalDeleteNote = (id) => {
    setIsOpenDeleteNoteModal(true);
    setNoteId(id);
  };

  const closeModalDeleteNote = () => {
    setIsOpenDeleteNoteModal(false);
  };

  return (
    <section className="dashboard-container">
      <header>
        <h1>settings</h1>
        <ul>
          <li>
            <button className="add-note-button" onClick={openModalAddNote}>
              Add note
            </button>
          </li>
        </ul>
        <button className="log-out-button" onClick={signOut}>
          log out
        </button>
      </header>
      <section className="notes-container">
        {notes.map((note) => (
          <Card
            key={note.id}
            data={note}
            onDelete={openModalDeleteNote}
            onEdit={openModalEditNote}
          />
        ))}
      </section>
      <NoteModal
        isOpen={isOpenAddNoteModal}
        closeModal={closeModalAddNote}
        setNewNote={setNewNote}
      />
      <DeleteNoteModal
        isOpen={isOpenDeleteNoteModal}
        noteId={deletedNoteId}
        closeModal={closeModalDeleteNote}
        notes={notes}
        setNotes={setNotes}
      />
      {isOpenEditNoteModal && (
        <EditNoteModal
          isOpen={isOpenEditNoteModal}
          note={editNote}
          closeModal={closeModalEditNote}
          setUpdatedNotes={setUpdatedNewNote}
        />
      )}
    </section>
  );
}

export default Dashboard;
