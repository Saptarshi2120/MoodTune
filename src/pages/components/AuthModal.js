import React, { useState } from "react";

const AuthModal = ({ isOpen, onClose, initialMode }) => {
  const [authMode, setAuthMode] = useState(initialMode || "login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {authMode === "login" ? "Login" : "Sign Up"}
        </h2>
        
        <form>
          <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" />
          <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            {authMode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm mt-3">
          {authMode === "login" ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-purple-600 ml-1">
            {authMode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>

        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
