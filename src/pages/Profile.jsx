import { Link } from "react-router-dom";
import StatusTag from "../components/StatusTag";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

export default function Profile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState([]);

  // Load profile
  useEffect(() => {
    if (!currentUser) return;

    const fetchProfile = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        setProfile({
          bio: "",
          email: currentUser.email,
          name: currentUser.displayName,
          role: "Freelancer",
          profilePicture: "",
          resume: ""
        });
      }
    };

    fetchProfile();
  }, [currentUser]);

  // Load jobs/proposals
  useEffect(() => {
    if (!profile) return;

    const fetchData = async () => {
      if (profile.role === "Client") {
        const jobsRef = collection(db, "jobs");
        const q = query(jobsRef, where("postedBy", "==", profile.name));
        const snap = await getDocs(q);
        setJobs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }

      if (profile.role === "Freelancer") {
        const proposalsRef = collection(db, "proposals");
        const q = query(proposalsRef, where("freelancer", "==", profile.name));
        const snap = await getDocs(q);
        setProposals(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }

      setLoading(false);
    };

    fetchData();
  }, [profile]);

  if (!currentUser) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            You’re not logged in
          </h1>
          <p className="text-gray-500 mb-4">
            Please{" "}
            <Link to="/signup" className="text-blue-500 underline">
              login or sign up
            </Link>{" "}
            to view your profile.
          </p>
        </div>
      </main>
    );
  }

  if (loading || !profile) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading profile...</div>
      </main>
    );
  }

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = profile.resume;
    link.download = `${profile.name?.replace(/\s+/g, "_")}_resume`;
    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              No photo
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {profile.name}
            </h1>
            <p className="text-blue-500 font-medium">{profile.role}</p>
            <p className="text-gray-700 mt-2">{profile.bio}</p>
            <p className="text-gray-500 text-sm mt-1">{profile.email}</p>

            {profile.role === "Freelancer" && profile.resume && (
              <button
                onClick={downloadResume}
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Download Resume
              </button>
            )}
          </div>
        </div>

        <hr className="my-6" />

        {profile.role === "Freelancer" ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Proposals Submitted
            </h2>
            <div className="space-y-4">
              {proposals.length > 0 ? (
                proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="bg-gray-50 p-4 rounded shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {proposal.jobTitle || "Job"}
                      </h3>
                      <p className="text-gray-500">
                        Budget: {proposal.proposedBudget}
                      </p>
                    </div>
                    <StatusTag status={proposal.status} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No proposals yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Jobs Posted
            </h2>
            <div className="space-y-4">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-gray-50 p-4 rounded shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {job.title}
                      </h3>
                      <p className="text-gray-500">Budget: {job.budget}</p>
                    </div>
                    <StatusTag status={job.status} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No jobs posted yet.</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 text-right">
          <Link
            to="/edit-profile"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </main>
  );
}
