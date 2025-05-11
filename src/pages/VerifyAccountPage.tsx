// src/pages/VerifyAccountPage.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyAccountPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    let hasRun = false;
  
    if (hasRun) return;
  
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      return;
    }
  
    axios
      .get(`http://localhost:8080/api/auth/verify?token=${token}`)
      .then(() => {
        setStatus('success');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch(() => {
        setStatus('error');
      });
  
    hasRun = true;
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="max-w-md w-full bg-gray-700 shadow-md rounded px-6 py-8 text-center">
        {status === 'loading' && (
          <p className="white text-lg">Verifying your account...</p>
        )}

        {status === 'success' && (
          <>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">✅ Account Verified!</h2>
            <p className="text-gray-700">Redirecting to login...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="text-2xl font-semibold text-red-600 mb-2">⚠️ Verification Failed</h2>
            <p className="text-white">
              Invalid or expired token. Please request a new verification email.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyAccountPage;
