import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const phrases: string[] = [
  "Tired of managing job applications in spreadsheets?",
  "Lost track of where you've applied?",
  "Your job search assistant - no clutter, just clarity.",
  "From applied to hired - all in one dashboard.",
];

export default function LandingPage(){
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % phrases.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col px-6 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Header/>
      <div className="flex flex-1 flex-col justify-center items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 max-w-2xl">
          {phrases[current]}
        </h1>

        <p className="text-base md:text-lg mb-8 max-w-xl text-gray-300">
          Meet <span className="text-blue-400 font-semibold">JobTrackr</span> — your personal dashboard for staying
          organized, confident, and in control throughout your job hunt.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-500 rounded-2xl font-semibold transition"
          >
            Get Started
          </Link>

          <a
            href="https://github.com/ffaustin17/jobtracker-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-400 hover:border-white rounded-2xl font-semibold transition"
          >
            View on Github
          </a>
        </div>
      </div>
    </div>
  );
}
