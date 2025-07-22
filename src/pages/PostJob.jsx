import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
import { postJobToFirestore } from "../helpers/firestoreJobs";

export default function PostJob() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            You need to log in
          </h1>
          <p className="text-gray-500">
            Please log in to post a job.
          </p>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !budget.trim()) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      await postJobToFirestore({ title, description, budget, user });
      toast.success("Job posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post job.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Post a Job</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build a React landing page"
              className="w-full border-gray-300 rounded shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the job requirements, deadlines, etc."
              className="w-full border-gray-300 rounded shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Budget
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="$200"
              className="w-full border-gray-300 rounded shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Post Job
          </button>
        </form>
      </div>
    </main>
  );
}
