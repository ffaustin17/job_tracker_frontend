import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

export default function LoginPage(){
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string| null>(null);

  const {login, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated){
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);


  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try{
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });

      if(!response.ok){
        throw new Error("Invalid credentials or server error.");
      }

      const responsePayload = await response.json();
      login(responsePayload.data.token, responsePayload.data.firstName);
      navigate("/dashboard");
    }
    catch(err){
      setError((err as Error).message);
    }
    finally{
      setLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6">
      <Header/>

      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <form onSubmit={handleLogin} className="flex-1 flex flex-col bg-slate-800 p-8 rounded-xl w-full h-full max-w-md shadow-lg">
          <h2 className="text-center text-5xl font-semibold mb-6 py-8">Login to JobTrackr</h2>

          {error && (
            <p className="text-red-400 text-sm mb-4">
              {error}
            </p>
          )}

          <label className="block mb-4">
            <span className="block text-sm mb-1">Email</span>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>

          <label className="block mb-6">
            <span className="block text-sm mb-1">Password</span>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold transition hover:cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-4 text-gray-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
      
    </div>
  );
}
