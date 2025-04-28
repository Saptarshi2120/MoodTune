import React, { useState, useEffect } from "react";
import { Music, Sun, Moon, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InfoModal from "./components/InfoModal";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [userSaved, setUserSaved] = useState(false);

  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ✅ UPDATED: Save user info to backend without access token
  useEffect(() => {
    const storeUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/store-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            picture: user.picture,
            sub: user.sub,
          }),
        });

        const data = await response.json();
        console.log('✅ User stored successfully:', data);
        setUserSaved(true);
      } catch (error) {
        console.error('❌ Error storing user:', error.message);
      }
    };

    if (isAuthenticated && user && !userSaved) {
      storeUser();
    }
  }, [isAuthenticated, user, userSaved]);

  const handleProtectedClick = async (path) => {
    if (!isAuthenticated) {
      await loginWithRedirect({
        appState: { returnTo: path },
      });
    } else {
      navigate(path);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-[#0a0a1f]" : "bg-gradient-to-br from-pink-100 to-purple-200"}`}>
      {/* Navigation Bar */}
      <nav className="fixed w-full p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <Music className={`w-8 h-8 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
          <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            MoodTunes
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleProtectedClick("/dashboard")}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
            Analytics
          </button>

          <button
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-100"}`}
            onClick={() => setIsInfoModalOpen(true)}
          >
            <Info className={isDarkMode ? "text-white" : "text-gray-800"} />
          </button>

          <button
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-100"}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="text-white" /> : <Moon className="text-gray-800" />}
          </button>

          {!isLoading && !isAuthenticated && (
            <button
              className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-100"}`}
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          )}

          {!isLoading && isAuthenticated && (
            <>
              <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Welcome, {user.name.split(" ")[0]}!
              </span>
              <button
                className={`px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700`}
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse"
              style={{
                left: `${(i * 25) + (mousePosition.x * 10)}%`,
                top: `${(i * 20) + (mousePosition.y * 10)}%`,
                backgroundColor: isDarkMode ? "#7c3aed" : "#d8b4fe",
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? "from-purple-400 to-pink-400" : "from-purple-600 to-pink-600"}`}>
            Let Us Find the Perfect Playlist for Your Mood!
          </h1>

          <p className={`text-xl mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Experience personalized music recommendations powered by AI. Tell us how you're feeling, and we'll create the perfect playlist to match your mood.
          </p>

          <button
            onClick={() => handleProtectedClick("/emotionquiz")}
            className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transform hover:scale-105 transition-all"
          >
            Discover Your Playlist 🎶
          </button>

          <div className={`mt-16 p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-lg`}>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              You feel! We care, because caring isn’t optional — it’s our core.
            </h2>
            <div className="flex justify-center gap-6">
              <button className="text-4xl hover:scale-125 transition-transform">😊</button>
              <button className="text-4xl hover:scale-125 transition-transform">😢</button>
              <button className="text-4xl hover:scale-125 transition-transform">😡</button>
              <button className="text-4xl hover:scale-125 transition-transform">😲</button>
              <button className="text-4xl hover:scale-125 transition-transform">😱</button>
              <button className="text-4xl hover:scale-125 transition-transform">🤢</button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </div>
  );
};

export default HomePage;
