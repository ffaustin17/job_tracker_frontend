import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import FeedBackPage from "./pages/FeedbackPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import CreateJobApplicationPage from "./pages/CreateJobApplicationPage";
import { AuthProvider } from "./context/AuthContext";
import VerifyAccountPage from "./pages/VerifyAccountPage";

import { Toaster } from "react-hot-toast";

export default function App(){
  return (
    <AuthProvider>
      <Toaster position="top-center"/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/feedback" element={<FeedBackPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-job" element={<CreateJobApplicationPage />} />
          <Route path="/verify" element={<VerifyAccountPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
    
  );
};


