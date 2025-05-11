import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegistrationPage(){
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Make API call to register
    setLoading(true);
    setError(null);

    try{
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        })
      });

      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
      }

      //redirect to feedback page with optional success message
      navigate("/feedback", {
        state: {
          title: "Account Created!",
          message: "Check your email to verify your JobTrackr account.",
          action: {label: "Go to Login", href: "/login"}
        }
      });
    }
    catch(err){
      setError((err as Error).message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-slate-800 p-8 rounded-xl w-full max-w-md shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold mb-6">Create your JobTrackr account</h2>

        {error && (
          <p className="text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        <label className="block mb-4">
          <span className="block text-sm mb-1">First Name</span>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm mb-1">Last Name</span>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm mb-1">Email</span>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm mb-1">Password</span>
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold transition cursor-pointer"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
