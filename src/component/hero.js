import React, { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote, shareNote } from "./API/api";

function Hero() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);

  // Load notes on start
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  const handleCreateOrUpdate = async () => {
    if (editId) {
      await updateNote(editId, newNote);
      setEditId(null);
    } else {
      await createNote(newNote);
    }
    setNewNote({ title: "", content: "" });
    loadNotes();
  };

  const handleEdit = (note) => {
    setEditId(note.id);
    setNewNote({ title: note.title, content: note.content });
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const handleShare = async (id) => {
    const res = await shareNote(id);
    alert("Share link: " + window.location.origin + "/share/" + id +
          "\n\nNote Content:\n" + res.data.content);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notes App</h2>

      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <br />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      />
      <br />
      <button onClick={handleCreateOrUpdate}>
        {editId ? "Update Note" : "Add Note"}
      </button>

      <h3>All Notes</h3>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <b>{note.title}</b>: {note.content}{" "}
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
            <button onClick={() => handleShare(note.id)}>Share</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Hero;
