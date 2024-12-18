import React, { useState } from "react";
import { db } from "../firebase-config"; // Firebase config file
import { collection, addDoc } from "firebase/firestore"; // Firebase Firestore functions

const WriteStory = () => {
  // Define state for the form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullStory, setFullStory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add new document to the "stories" collection in Firestore
      await addDoc(collection(db, "stories"), {
        title,
        description,
        fullStory,
        authorName,
        date,
      });

      // Reset form after submission
      setTitle("");
      setDescription("");
      setFullStory("");
      setAuthorName("");
      setDate("");

      setLoading(false);
      alert("Story saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
      alert("Error saving the story.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-[90%] max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Write a Story</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-lg">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-lg">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fullStory" className="block text-gray-700 text-lg">Full Story</label>
            <textarea
              id="fullStory"
              value={fullStory}
              onChange={(e) => setFullStory(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="authorName" className="block text-gray-700 text-lg">Author Name</label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-lg">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? "Saving..." : "Save Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteStory;
