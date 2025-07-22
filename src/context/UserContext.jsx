import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  const [proposals, setProposals] = useState([]);
  const [proposalsLoading, setProposalsLoading] = useState(true);

  // 🔷 Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({ uid: firebaseUser.uid, ...docSnap.data() });
        } else {
          toast.error("User profile not found!");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔷 Fetch jobs on load
  useEffect(() => {
    const fetchJobs = async () => {
      setJobsLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const jobsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsData);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        toast.error("Failed to load jobs");
      } finally {
        setJobsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 🔷 Fetch proposals on load
  useEffect(() => {
    const fetchProposals = async () => {
      setProposalsLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "proposals"));
        const proposalsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProposals(proposalsData);
      } catch (err) {
        console.error("Failed to fetch proposals:", err);
        toast.error("Failed to load proposals");
      } finally {
        setProposalsLoading(false);
      }
    };
    fetchProposals();
  }, []);

  // 🔷 Log out
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    toast.success("Logged out successfully");
  };

  // 🔷 Update user state locally (call Firestore elsewhere)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    toast.success("Profile updated!");
  };

  // 🔷 Change job status and update Firestore
  const changeJobStatus = async (jobId, newStatus) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    try {
      const jobRef = doc(db, "jobs", jobId);
      await updateDoc(jobRef, { status: newStatus });
      toast.success(`Job marked as ${newStatus}`);
    } catch (err) {
      console.error("Failed to update job:", err);
      toast.error("Failed to update job status");
    }
  };

  // 🔷 Change proposal status and update Firestore
  const changeProposalStatus = async (proposalId, newStatus) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId ? { ...p, status: newStatus } : p
      )
    );
    try {
      const proposalRef = doc(db, "proposals", proposalId);
      await updateDoc(proposalRef, { status: newStatus });
      toast.success(`Proposal marked as ${newStatus}`);
    } catch (err) {
      console.error("Failed to update proposal:", err);
      toast.error("Failed to update proposal status");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        logout,
        loading,

        jobs,
        jobsLoading,
        setJobs,
        changeJobStatus,

        proposals,
        proposalsLoading,
        setProposals,
        changeProposalStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
