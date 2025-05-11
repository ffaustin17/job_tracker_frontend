import JobForm from "../components/create-job-application/JobForm";
import { Link } from "react-router-dom";

export default function CreateJobApplicationPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
        {/*App bar*/}
        <div className="px-6 py-4 flex justify-between items-center border-b border-slate-700">
            <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition">
                JobTrackr
            </Link>
        </div>

        {/* back button */}
        <div className="px-6 py-2">
            <Link
                to="/dashboard"
                className="text-sm text-blue-300 hover:underline inline-flex items-center gap-1"
            >
                ← Back to Dashboard
            </Link>
        </div>

        {/*page title*/}
        <header className="px-6 py-2">
            <h1 className="text-3xl font-semibold text-white text-center">Create a Job Application</h1>
        </header>

        {/*main form section*/}
        <main className="flex-grow py-6">
            <JobForm/>
        </main>
      

      {/* Page Footer */}
      <footer className="bg-gray-900 border-t py-4 text-center text-sm text-gray-400">
        JobTrackr © 2025 — Built with 💼 by Fabrice
      </footer>
    </div>
  );
}
