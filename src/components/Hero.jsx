import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import authorImage from "../assets/sandhya.jpeg"

const Hero = () => {
  const [story, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stories"));
        const stories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(stories);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-md fixed top-0 left-0 z-10">
        <Link to="/write-story">
          <h1 className="text-4xl font-bold text-gray-800 mt-4 text-center py-4" style={{ fontFamily: 'Zapfino', fontStyle: 'italic' }}>
            Jonna's Pen
          </h1>
        </Link>
      </div>

      <div className="pt-24 grid grid-cols-1 md:grid-cols-1 gap-6 w-[90%] max-w-6xl mx-auto">
        {story.map((story) => (
          <div
            key={story.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start text-left"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {story.title}
            </h2>

            {/* Author and Meta Information */}
            <div className="flex items-center mb-4">
              <img
                src={authorImage} // Default image if none exists
                alt={story.authorName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-800 font-semibold">{story.authorName}</p>
                <p className="text-sm text-gray-500">{story.date}</p>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{story.description}</p>

            {/* Meta: Reads count */}
            <p className="text-sm text-gray-500 mb-4">{story.reads || "50"} Reads</p>

            {/* Always show the Read More link */}
            <Link to={`/story/${story.id}`} className="text-blue-500 hover:underline mt-4">
              Read More
            </Link>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Hero;
