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
import FreelancerProfile from "./pages/FreelancerProfile.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar  />
      <div className="pt-16">
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
        <Route path="/profile/:uid" element={<FreelancerProfile />} />
        

      </Routes>
      </div>
      <Footer/>
    </>
  );
}
