import { useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
import { sendProposalToFirestore } from "../helpers/firestoreProposals";

export default function JobDetails() {
  const { jobId } = useParams();
  const { user, jobs } = useUser();

  const job = jobs.find((j) => j.id === jobId);

  const [proposedBudget, setProposedBudget] = useState("");
  const [message, setMessage] = useState("");

  if (!job) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-700">Job not found</h1>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!proposedBudget.trim() || !message.trim()) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      await sendProposalToFirestore({
        jobId,
        freelancer: user.name,
        freelancerUid: user.uid,
        proposedBudget: proposedBudget.trim(),
        message: message.trim(),
      });
      toast.success("Proposal sent successfully!");
      setProposedBudget("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send proposal.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <p className="text-gray-700 mb-2">
          Budget: <span className="font-semibold">{job.budget}</span>
        </p>
        <p className="text-gray-700 mb-6">
          Posted by: <span className="font-semibold">{job.postedBy}</span>
        </p>

        {user?.role === "Freelancer" ? (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Submit Your Proposal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Proposed Budget
                </label>
                <input
                  type="text"
                  value={proposedBudget}
                  onChange={(e) => setProposedBudget(e.target.value)}
                  placeholder="e.g., $250"
                  className="w-full border-gray-300 rounded shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700"> 
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a short message describing your proposal…"
                  className="w-full border-gray-300 rounded shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Send Proposal
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-yellow-50 text-yellow-700 p-4 rounded shadow">
            <p>Only freelancers can submit proposals for jobs.</p>
          </div>
        )}
      </div>
    </main>
  );
}
