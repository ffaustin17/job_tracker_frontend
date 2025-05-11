import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to landing page
  };

  return (
    <header className="flex justify-between items-center px-4 py-4 border-b border-slate-700">
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-400 cursor-pointer">JobTrackr</h1>
      </Link>

      <div className="flex gap-4 text-sm">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hover:underline text-white">
              Login
            </Link>
            <Link to="/register" className="hover:underline text-white">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-white hover:underline"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
