import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import StatusTag from "../components/StatusTag";

export default function Jobs() {
  const { jobs } = useUser(); // 🔷 use jobs from context
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Listings</h1>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Client: {job.postedBy} | Budget: {job.budget}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <StatusTag status={job.status} />
                  <Link
                    to={`/jobs/${job.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No jobs found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
