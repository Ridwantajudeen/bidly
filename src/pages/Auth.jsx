import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "freelancer",
  });

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = formData.email.trim();
    const password = formData.password;
    const fullName = formData.fullName.trim();
    const role = formData.role === "client" ? "Client" : "Freelancer";

    try {
      if (isLogin) {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setUser({ uid: user.uid, ...docSnap.data() });
          toast.success("Logged in!");
          navigate("/dashboard");
        } else {
          toast.error("No user profile found!");
        }
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const profile = {
          name: fullName,
          email,
          role,
          profilePicture: null,
          resume: null,
          createdAt: new Date(),
        };
        await setDoc(doc(db, "users", user.uid), profile);
        setUser({ uid: user.uid, ...profile });
        toast.success("Account created!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded shadow max-w-md w-full p-6">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-medium rounded-l ${
              isLogin ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-r ${
              !isLogin ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="mt-1 w-full border-gray-300 rounded shadow-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-1 w-full border-gray-300 rounded shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="mt-1 w-full border-gray-300 rounded shadow-sm"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 rounded shadow-sm"
              >
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-500 text-sm hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
