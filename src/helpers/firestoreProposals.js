import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function sendProposalToFirestore({ jobId, freelancer, freelancerUid, proposedBudget, message }) {
  const newProposal = {
    jobId,
    freelancer,
    freelancerUid,
    proposedBudget,
    message,
    status: "Pending",
    createdAt: serverTimestamp(),
  };

  return await addDoc(collection(db, "proposals"), newProposal);
}
