import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="bg-[#f4f0f0] p-4 rounded-xl shadow-[4px_4px_10px_#bebebe,_-4px_-4px_10px_#ffffff] transition duration-200 font-mono">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h2>
      <p className="text-gray-700 text-sm leading-snug whitespace-pre-wrap">{note.description}</p>

      <div className="flex justify-end mt-4 space-x-3">
        <button
          className="p-2 rounded-full bg-[#f6efef] text-black shadow-[2px_2px_6px_#bebebe,_-2px_-2px_6px_#ffffff] hover:shadow-inner transition"
          onClick={() => onEdit(note)}
        >
          <FaEdit />
        </button>
        <button
          className="p-2 rounded-full bg-[#e0e0e0] text-red-600 shadow-[2px_2px_6px_#bebebe,_-2px_-2px_6px_#ffffff] hover:shadow-inner transition"
          onClick={() => deleteNote(note._id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;



