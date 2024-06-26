import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import Card from "../common/Card";
import NoteModal from "../common/NoteModal";
import DeleteNoteModal from "../common/DeleteNoteModal";
import EditNoteModal from "../common/EditNoteModal";
import ChangeEmailModal from "../common/ChangeEmailModal";
import ChangePwdModal from "../common/ChangePwdModal";
import DeleteAccountModal from "../common/DeleteAccountModal";
import "../styles/dashboard.css";

function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [noteCreated, setNewNote] = useState({});
  const [noteUpdated, setNoteUpdated] = useState({});
  const [noteCompleted, setNoteCompleted] = useState({});
  const [deletedNoteId, setNoteId] = useState();
  const [isOpenAddNoteModal, setIsOpenAddNoteModal] = useState(false);
  const [isOpenDeleteNoteModal, setIsOpenDeleteNoteModal] = useState(false);
  const [isOpenEditNoteModal, setIsOpenEditNoteModal] = useState(false);
  const [isOpenChangeEmailModal, setIsOpenChangeEmailModal] = useState(false);
  const [isOpenChangePwdModal, setIsOpenChangePwdModal] = useState(false);
  const [isOpenDeleteAccountModal, setIsOpenDeleteAccountModal] =
    useState(false);
  const [editNote, setEditNote] = useState();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentNotesDisplayed, setCurrentNotesDisplayed] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getNotes = async () => {
      try {
        const response = await axiosPrivate.get("/notes", {
          signal: controller.signal,
        });
        isMounted && setNotes(response.data);
        setSelectedFilter("");
        setCurrentNotesDisplayed("pending");
      } catch (err) {
        if (err.response.status === 404) setCurrentNotesDisplayed("empty");
        console.log(err.response.status);
      }
    };
    getNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [noteCreated, noteUpdated, noteCompleted]);

  const signOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //=========Modal methods
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

  const openModalChangeEmail = () => {
    setIsOpenChangeEmailModal(true);
  };

  const closeModalChangeEmail = () => {
    setIsOpenChangeEmailModal(false);
  };

  const openModalChangePwd = () => {
    setIsOpenChangePwdModal(true);
  };

  const closeModalChangePwd = () => {
    setIsOpenChangePwdModal(false);
  };

  const openModalDeleteAccount = () => {
    setIsOpenDeleteAccountModal(true);
  };

  const closeModalDeleteAccount = () => {
    setIsOpenDeleteAccountModal(false);
  };

  //=========Filter methods
  const handleFilter = (column, value) => {
    const getNotes = async () => {
      try {
        const { data: notes } = await axiosPrivate.get(
          `/notes?${column}=${value}`
        );
        setSelectedFilter(value);
        setNotes(notes);
      } catch (err) {
        console.log(err);
        if (err.response.status === 404) setSelectedFilter("");
        console.log(err.response.status);
      }
    };
    getNotes();
  };

  const clearFilter = () => {
    const getNotes = async () => {
      try {
        const { data: notes } = await axiosPrivate.get("/notes");
        setSelectedFilter("");
        setNotes(notes);
      } catch (err) {
        console.log(err);
      }
    };
    getNotes();
  };

  const handleCompleted = (data) => {
    const currentDate = new Date().toString().split(" ").slice(0, 5).join(" ");
    const updatedNote = {
      ...data,
      date_updated: currentDate,
      status: "completed",
    };

    const editNote = async () => {
      try {
        await axiosPrivate.put(`/notes/${data.id}`, updatedNote);
        setNoteCompleted(updatedNote);
      } catch (err) {
        console.log(err.response.status);
      }
    };
    editNote();
  };

  return (
    <section className="dashboard-container">
      <header>
        <div className="settings-wrapper">
          <h1>settings</h1>
          <ul>
            <li onClick={openModalChangeEmail}>Change email</li>
            <li onClick={openModalChangePwd}>Change password</li>
            <li onClick={openModalDeleteAccount}>Delete account</li>
          </ul>
        </div>
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
      <section className="content">
        <section className="controllers">
          <div className="filter-container category">
            <div>
              <h1>Filter By:</h1>
              <span
                className={
                  selectedFilter !== ""
                    ? "clear-filter active"
                    : "clear-filter inactive"
                }
                onClick={clearFilter}
              >
                (clear)
              </span>
            </div>
            <div>
              <p
                className={
                  selectedFilter === "todo"
                    ? "todo-filter selected"
                    : "todo-filter"
                }
                onClick={() => handleFilter("category", "todo")}
              >
                To-DOS
              </p>
              <span>or</span>
              <p
                className={
                  selectedFilter === "reminder"
                    ? "reminder-filter selected"
                    : "reminder-filter"
                }
                onClick={() => handleFilter("category", "reminder")}
              >
                Reminders
              </p>
            </div>
          </div>
        </section>
        <section className="notes-main">
          <div className="switchers-container">
            <h1
              className={
                currentNotesDisplayed === "pending" ? "inprogress-actived" : ""
              }
              onClick={() => setCurrentNotesDisplayed("pending")}
            >
              in progress
            </h1>
            <h1
              className={
                currentNotesDisplayed === "completed" ? "completed-actived" : ""
              }
              onClick={() => setCurrentNotesDisplayed("completed")}
            >
              completed
            </h1>
          </div>
          {currentNotesDisplayed === "pending" && (
            <section className="notes-container">
              {notes
                .filter((note) => note.status === "pending")
                .map((note) => (
                  <Card
                    key={note.id}
                    data={note}
                    onDelete={openModalDeleteNote}
                    onEdit={openModalEditNote}
                    onComplete={handleCompleted}
                  />
                ))}
            </section>
          )}
          {currentNotesDisplayed === "completed" && (
            <section className="notes-container">
              {notes
                .filter((note) => note.status === "completed")
                .map((note) => (
                  <Card
                    key={note.id}
                    data={note}
                    onDelete={openModalDeleteNote}
                    onEdit={openModalEditNote}
                    onComplete={handleCompleted}
                  />
                ))}
            </section>
          )}
          {currentNotesDisplayed === "empty" && (
            <section className="notes-container">
              <h1 className="empty-notes-message">your notes are empty</h1>
            </section>
          )}
        </section>
      </section>
      {isOpenAddNoteModal && (
        <NoteModal
          isOpen={isOpenAddNoteModal}
          closeModal={closeModalAddNote}
          setNewNote={setNewNote}
        />
      )}
      {isOpenDeleteNoteModal && (
        <DeleteNoteModal
          isOpen={isOpenDeleteNoteModal}
          noteId={deletedNoteId}
          closeModal={closeModalDeleteNote}
          notes={notes}
          setNotes={setNotes}
        />
      )}
      {isOpenEditNoteModal && (
        <EditNoteModal
          isOpen={isOpenEditNoteModal}
          note={editNote}
          closeModal={closeModalEditNote}
          setUpdatedNotes={setNoteUpdated}
        />
      )}
      {isOpenChangeEmailModal && (
        <ChangeEmailModal
          isOpen={isOpenChangeEmailModal}
          closeModal={closeModalChangeEmail}
        />
      )}
      {isOpenChangePwdModal && (
        <ChangePwdModal
          isOpen={isOpenChangePwdModal}
          closeModal={closeModalChangePwd}
        />
      )}
      {isOpenDeleteAccountModal && (
        <DeleteAccountModal
          isOpen={isOpenDeleteAccountModal}
          closeModal={closeModalDeleteAccount}
        />
      )}
    </section>
  );
}

export default Dashboard;
