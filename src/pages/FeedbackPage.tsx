import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface FeedbackState {
  title?: string;
  message?: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function FeedbackPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as FeedbackState;

  useEffect(() => {
    if (!state) {
      // Redirect to home if page is accessed without state
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-slate-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{state.title || "Success"}</h1>
        <p className="text-lg text-gray-300 mb-6">
          {state.message || "Everything went as expected."}
        </p>

        {state.action && (
          <Link
            to={state.action.href}
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {state.action.label}
          </Link>
        )}
      </div>
    </div>
  );
}
