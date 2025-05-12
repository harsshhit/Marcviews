import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password, confirmPassword);
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-black">Join us</h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-b-2 border-gray-200 text-black bg-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-b-2 border-gray-200 text-black bg-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-b-2 border-gray-200 text-black bg-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-b-2 border-gray-200 text-black bg-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-all duration-200"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-white font-medium bg-black hover:bg-gray-900 rounded-none transition-all duration-200 disabled:opacity-70 mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-xs text-gray-500 uppercase">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div> */}
          {/* 
          <button
            type="button"
            className="w-full py-3 px-4 border border-black text-black font-medium flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5C13.6168 5 15.1013 5.55353 16.2863 6.47406L19.9235 3.00409C17.8088 1.13995 15.0406 0 12 0C7.3924 0 3.39667 2.59991 1.3858 6.40985L5.43024 9.60278C6.40997 6.91937 8.97748 5 12 5Z"
                fill="#EA4335"
              />
              <path
                d="M23.8961 13.5018C23.9586 13.0102 24 12.5087 24 12C24 11.1422 23.9063 10.3068 23.7352 9.5H12V14H18.4862C17.9615 15.6941 16.8023 17.1334 15.2467 18.0487L19.0285 21.1903C21.1035 19.1345 22.5795 16.5587 23.2219 13.6026C23.2305 13.569 23.2498 13.5353 23.2585 13.5018H23.8961Z"
                fill="#4285F4"
              />
              <path
                d="M5 12C5 11.1566 5.15686 10.3516 5.43024 9.60278L1.3858 6.40985C0.504333 8.08002 0 9.98017 0 12C0 13.9973 0.495667 15.8763 1.35701 17.533L5.40725 14.3393C5.14421 13.6087 5 12.8227 5 12Z"
                fill="#FBBC05"
              />
              <path
                d="M12 19C8.95447 19 6.37042 17.0515 5.40725 14.3393L1.35701 17.533C3.35681 21.3681 7.36258 24 12 24C15.0278 24 17.7888 22.8742 19.0285 21.1903L15.2467 18.0487C14.2855 18.6559 13.1741 19 12 19Z"
                fill="#34A853"
              />
            </svg>
            Continue with Google
          </button> */}
          <p className="mt-3 text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-red-600 font-medium hover:text-red-800 transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        </form>

        <p className="mt-8 text-xs text-center text-gray-500">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-red-600 hover:text-red-800">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-red-600 hover:text-red-800">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
