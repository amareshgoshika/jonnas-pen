import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, collection, addDoc, query, orderBy, getDocs, updateDoc } from "firebase/firestore";
import { app } from "../firebase-config";
import authorImage from "../assets/sandhya.jpeg";

const StoryPage = () => {
  const { id } = useParams(); // Capture the ID from the URL
  const [story, setStory] = useState(null); // Store story data from Firebase
  const [comments, setComments] = useState([]); // Store comments for the story
  const [newComment, setNewComment] = useState(""); // New comment input state
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const db = getFirestore(app);
    const docRef = doc(db, "stories", id); // Reference to the specific story
    const fetchStory = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const storyData = docSnap.data();
          setStory(storyData); // Set the story data into state
            await updateDoc(docRef, {
            reads: storyData.reads ? storyData.reads + 1 : 1,
          });
        } else {
          setError("Story not found");
        }
      } catch (error) {
        setError("Error fetching story: " + error.message);
      }
    };

    // Fetch comments from the "comments" collection
    const fetchComments = async () => {
      try {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, orderBy("timestamp"));
        const querySnapshot = await getDocs(q);
        const commentsArray = [];
        querySnapshot.forEach((doc) => {
          commentsArray.push({ id: doc.id, ...doc.data() });
        });
        setComments(commentsArray); // Set the comments into state
      } catch (error) {
        setError("Error fetching comments: " + error.message);
      }
    };

    fetchStory();
    fetchComments();
    setLoading(false);
  }, [id]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Do not submit if comment is empty

    const db = getFirestore(app);
    try {
      // Add new comment to the "comments" collection in Firestore
      await addDoc(collection(db, "comments"), {
        storyId: id,
        comment: newComment,
        timestamp: new Date(),
      });
      setNewComment(""); // Clear the comment input after submission
      // Re-fetch comments after submitting
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, orderBy("timestamp"));
      const querySnapshot = await getDocs(q);
      const commentsArray = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentsArray); // Update the comments state
    } catch (error) {
      setError("Error submitting comment: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!story) {
    return <div>Story not found</div>;
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
              src={authorImage}
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

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>

          {/* Display comments */}
          <div className="mt-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white shadow-md p-4 rounded-lg mb-4">
                  <p className="text-gray-600">{comment.comment}</p>
                  <p className="text-xs text-gray-400">{new Date(comment.timestamp.seconds * 1000).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {/* Comment input */}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
              className="w-full p-2 border rounded-lg"
              placeholder="Write your comment..."
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white rounded-lg bg-blue-500 hover:bg-blue-600"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
