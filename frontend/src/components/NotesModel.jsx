import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const NotesModel = ({ closeModel, addNote, currentNote, editNote }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    if (currentNote) {
      reset({
        title: currentNote.title,
        description: currentNote.description,
      });
    }
  }, [currentNote, reset]);

  const onSubmit = async (data) => {
    if (currentNote) {
      await editNote(data);
    } else {
      await addNote(data);
    }
  };

 return (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-[5px] flex justify-center items-center z-50">
    <div className="bg-[#f4f0f0] p-8 rounded-2xl shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] max-w-md w-full mx-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {currentNote ? 'Edit Note' : 'Add New Note'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-600 mb-1">Note Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 rounded-xl bg-[#f8f8f8] shadow-inner text-gray-800 focus:outline-none"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-1">Note Description</label>
          <textarea
            rows={4}
            {...register('description', { required: 'Description is required' })}
            className="w-full px-4 py-2 rounded-xl bg-[#f8f8f8] shadow-inner text-gray-800 focus:outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#f8f8f8] text-gray-700 py-2 rounded-xl shadow-[4px_4px_8px_#bebebe,_-4px_-4px_8px_#ffffff] hover:shadow-inner transition duration-300"
        >
          {currentNote ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      {/* Cancel Button */}
      <button
        onClick={closeModel}
        className="w-full mt-4 bg-[#f8f8f8] text-red-700 py-2 rounded-xl shadow-[4px_4px_8px_#bebebe,_-4px_-4px_8px_#ffffff] hover:shadow-inner transition duration-300"
      >
        Cancel
      </button>
    </div>
  </div>
);

};

export default NotesModel;

