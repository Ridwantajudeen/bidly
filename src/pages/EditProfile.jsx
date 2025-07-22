import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { useAuth } from "../hooks/useAuth"; // your custom hook for auth
import toast from "react-hot-toast";

export default function EditProfile() {
  const { currentUser } = useAuth(); // get { uid, email } from auth
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [resume, setResume] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  // Load existing profile data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBio(data.bio || "");
          setEmail(data.email || currentUser.email);
          setProfilePicture(data.profilePicture || "");
          setResume(data.resume || "");
        } else {
          setEmail(currentUser.email);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile.");
      }
    };

    fetchUser();
  }, [currentUser]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      setProfilePicture(URL.createObjectURL(file)); // preview
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setResume(file.name); // just display file name
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRef = doc(db, "users", currentUser.uid);
    const updates = {
      bio,
      email,
    };

    try {
      if (profilePictureFile) {
        const picRef = ref(storage, `profilePictures/${currentUser.uid}`);
        await uploadBytes(picRef, profilePictureFile);
        const picURL = await getDownloadURL(picRef);
        updates.profilePicture = picURL;
      }

      if (resumeFile) {
        const resumeRef = ref(storage, `resumes/${currentUser.uid}`);
        await uploadBytes(resumeRef, resumeFile);
        const resumeURL = await getDownloadURL(resumeRef);
        updates.resume = resumeURL;
      }

      await updateDoc(userRef, updates);
      toast.success("Profile updated!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border-gray-300 rounded shadow-sm mt-1"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded shadow-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="w-full border-gray-300 rounded shadow-sm mt-1"
            />
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Preview"
                className="mt-2 w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="w-full border-gray-300 rounded shadow-sm mt-1"
            />
            {resume && (
              <p className="text-sm text-gray-600 mt-1">Uploaded: {resume}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
