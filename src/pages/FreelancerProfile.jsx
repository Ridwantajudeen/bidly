import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import StatusTag from "../components/StatusTag";

export default function FreelancerProfile() {
  const { uid } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFreelancer(docSnap.data());
        } else {
          setFreelancer(null);
        }
      } catch (err) {
        console.error("Error fetching freelancer:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancer();
  }, [uid]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading profile…</p>
      </main>
    );
  }

  if (!freelancer) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>User not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-gray-800">
          {freelancer.name}
        </h1>
        <p className="text-gray-600 mb-2">
          Role: {freelancer.role}
        </p>
        <p className="text-gray-600">
          Email: {freelancer.email || "N/A"}
        </p>
        {/* Add more fields if your user schema has skills, bio, etc */}
        <div className="mt-4">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
