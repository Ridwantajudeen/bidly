// helpers/firestoreJobs.js
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function postJobToFirestore({ title, description, budget, user }) {
  const newJob = {
    title: title.trim(),
    description: description.trim(),
    budget: budget.trim(),
    postedBy: user.name,
    postedByUid: user.uid,
    status: "Open",
    createdAt: serverTimestamp(),
  };

  return await addDoc(collection(db, "jobs"), newJob);
}
