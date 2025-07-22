import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Profile from "./pages/Profile.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PostJob from "./pages/PostJob.jsx";
import EditProfile from "./pages/EditProfile.jsx";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </>
  );
}
