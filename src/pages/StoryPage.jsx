import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase-config";
import authorImage from "../assets/sandhya.jpeg"

const StoryPage = () => {
  const { id } = useParams(); // Capture the ID from the URL
  const [story, setStory] = useState(null); // Store story data from Firebase
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const db = getFirestore(app);
    const docRef = doc(db, "stories", id); // Assuming your collection name is "stories"
    
    // Log the ID to check if it's correct
    console.log("Fetching story with ID:", id);

    // Fetch the document from Firestore
    const fetchStory = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStory(docSnap.data()); // Set the story data into state
        } else {
          setError("Story not found");
          console.log("No such document!");
        }
      } catch (error) {
        setError("Error fetching story: " + error.message);
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };
    
    fetchStory();
  }, [id]); // Fetch the story when the ID changes

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!story) {
    return <div>Story not found</div>; // Handle case if no story is returned
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-md fixed top-0 left-0 z-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center py-4">
          {story.title}
        </h1>
      </div>

      <div className="pt-24 w-[90%] max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <img
              src={authorImage} // Assuming you have authorImage in Firestore
              alt={story.authorName}
              className="w-10 h-10 rounded-full mr-4"
            />
            <span className="text-gray-600">{story.authorName}</span>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            <span>{story.date}</span>
          </div>

          <p className="text-gray-600 mb-4">{story.description}</p>
          
          <p className="text-gray-600">{story.fullStory}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
