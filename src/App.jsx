import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoryPage from "./pages/StoryPage";
import WriteStory from "./pages/WriteStory";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <BarLoader color="#f6c400" height={4} />
        </div>
      }
    >
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <BarLoader color="#f6c400" height={4} />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/write-story" element={<WriteStory />} />
        </Routes>
      )}
    </Suspense>
  );
};

export default App;
