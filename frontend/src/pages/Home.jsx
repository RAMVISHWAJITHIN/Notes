import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import NotesModel from '../components/NotesModel';
import NoteCard from '../components/NoteCard';
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [filter, setFilter] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/note', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data.notes);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error('Failed to fetch notes');
    }
  };

  const addNote = async (data) => {
    try {
      if (!user) {
        toast.error('Please login to add a note');
        return;
      }

      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/note/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotes();
      setModelOpen(false);
      toast.success('Note added successfully');
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error('Failed to add note');
    }
  };

  const editNote = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/note/${currentNote._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotes();
      setModelOpen(false);
      setCurrentNote(null);
      toast.success('Note updated successfully');
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error('Failed to update note');
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotes();
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error('Failed to delete note');
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filter.toLowerCase())
  );

return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setFilter={setFilter} />

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filter.length > 0 ? (
          filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEdit}
                deleteNote={deleteNote}
              />
            ))
          ) : (
            <p className="text-gray-500">No notes found</p>
          )
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              deleteNote={deleteNote}
            />
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-32 right-16 w-14 h-14 bg-gray-950 text-white text-3xl rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
        onClick={() => {
          setCurrentNote(null);
          setModelOpen(true);
        }}
      >
        +
      </button>

      {/* Note Modal */}
      {isModelOpen && (
        <NotesModel
          closeModel={() => setModelOpen(false)}
          currentNote={currentNote}
          addNote={addNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;







