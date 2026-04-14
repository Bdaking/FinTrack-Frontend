import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { MdDeleteOutline } from "react-icons/md";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Fetch notes from MongoDB
  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      setNotes(response.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  // Save a new note to MongoDB
  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      await axiosInstance.post("/add-note", { text: newNote });
      setNewNote("");
      fetchNotes(); // Refresh the list from the database
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  // Delete a note from MongoDB
  const deleteNote = async (id) => {
    try {
      await axiosInstance.delete(`/delete-note/${id}`);
      fetchNotes(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <DashboardLayout activeMenu="Notes">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">
          Important Notes
        </h2>

        {/* Input Area */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-slate-100">
          <textarea
            className="w-full p-3 border rounded-lg text-sm outline-none focus:border-primary transition-all"
            rows="3"
            placeholder="Write a financial reminder..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button
            onClick={addNote}
            className="btn-primary mt-3 !w-auto px-6 py-2"
          >
            Save Note
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm group relative"
            >
              <div className="flex justify-between items-start">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {note.text}
                </p>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <MdDeleteOutline size={20} />
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-4 block">
                {new Date(note.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notes;
