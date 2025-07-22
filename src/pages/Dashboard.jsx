import { Link } from "react-router-dom";
import StatusTag from "../components/StatusTag";
import { useUser } from "../context/UserContext";

export default function Dashboard() {
  const {
    user,
    jobs,
    proposals,
    loading,

    changeJobStatus,
    changeProposalStatus,
  } = useUser();

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading your dashboard…</p>
      </main>
    );
  }

  if (!user) {
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
            to access your dashboard.
          </p>
        </div>
      </main>
    );
  }

  const isFreelancer = user.role === "Freelancer";

  const jobsPostedByClient = jobs.filter(
    (job) => job.postedByUid === user.uid
  );

  const proposalsForMyJobs = proposals.filter((p) =>
    jobsPostedByClient.some((job) => job.id === p.jobId)
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600 mb-6">
          Here’s an overview of your activity on{" "}
          <span className="text-blue-500 font-semibold">Bidly</span>.
        </p>

        {isFreelancer ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Proposals
            </h2>
            {proposals.filter((p) => p.freelancerUid === user.uid).length === 0 ? (
              <p className="text-gray-500">
                No proposals sent yet.{" "}
                <Link to="/jobs" className="text-blue-500 underline">
                  Browse jobs
                </Link>{" "}
                and start bidding!
              </p>
            ) : (
              <div className="space-y-4">
                {proposals
                  .filter((p) => p.freelancerUid === user.uid)
                  .map((proposal) => {
                    const job = jobs.find((j) => j.id === proposal.jobId);
                    return (
                      <div
                        key={proposal.id}
                        className="bg-white p-4 rounded shadow flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {job?.title || "Job deleted"}
                          </h3>
                          <p className="text-gray-500">
                            Proposed: {proposal.proposedBudget}
                          </p>
                        </div>
                        <StatusTag status={proposal.status} />
                      </div>
                    );
                  })}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Jobs You Posted
              </h2>
              <Link
                to="/post-job"
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                + Post Job
              </Link>
            </div>

            {jobsPostedByClient.length === 0 ? (
              <p className="text-gray-500">
                No jobs posted yet.{" "}
                <Link to="/post-job" className="text-blue-500 underline">
                  Post one now
                </Link>
                !
              </p>
            ) : (
              <div className="space-y-4 mb-6">
                {jobsPostedByClient.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-4 rounded shadow flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {job.title}
                      </h3>
                      <p className="text-gray-500">Budget: {job.budget}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusTag status={job.status} />
                      {job.status !== "Completed" && (
                        <button
                          onClick={() =>
                            changeJobStatus(
                              job.id,
                              job.status === "Open" ? "In Progress" : "Completed"
                            )
                          }
                          className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                        >
                          Mark as{" "}
                          {job.status === "Open" ? "In Progress" : "Completed"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Proposals You Received
            </h2>
            {proposalsForMyJobs.length === 0 ? (
              <p className="text-gray-500">No proposals received yet.</p>
            ) : (
              <div className="space-y-4">
                {proposalsForMyJobs.map((proposal) => {
                  const job = jobs.find((j) => j.id === proposal.jobId);
                  return (
                    <div
                      key={proposal.id}
                      className="bg-white p-4 rounded shadow"
                    >
                      <h3 className="text-lg font-medium text-gray-800">
                        {job?.title || "Job deleted"}
                      </h3>
                     <p className="text-gray-500">
  From:{" "}
  <Link
    to={`/profile/${proposal.freelancerUid}`}
    className="text-blue-500 underline"
  >
    {proposal.freelancer}
  </Link>{" "}
  | Budget: {proposal.proposedBudget}
</p>
                      <p className="text-gray-700 mt-2">{proposal.message}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <StatusTag status={proposal.status} />
                        {proposal.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                changeProposalStatus(proposal.id, "Accepted")
                              }
                              className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                changeProposalStatus(proposal.id, "Rejected")
                              }
                              className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className="mt-6 text-right">
          <Link
            to="/profile"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View Profile
          </Link>
        </div>
      </div>
    </main>
  );
}
