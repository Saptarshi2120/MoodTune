// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowLeft, Camera, Send } from 'lucide-react';
// import Webcam from 'react-webcam';
// import { useNavigate } from "react-router-dom";
// const questions = [
//   {
//     id: 1,
//     text: "How has your day been so far?",
//     placeholder: "Tell me about your day..."
//   },
//   {
//     id: 2,
//     text: "What's the one emoji that best describes your mood?",
//     placeholder: "Type or paste an emoji here..."
//   },
//   {
//     id: 3,
//     text: "What's your current mindset like?",
//     placeholder: "Describe how you're feeling..."
//   },
//   {
//     id: 4,
//     text: "What is your preferred language for songs?",
//     placeholder: "Enter your preferred language..."
//   }
// ];

// export default function EmotionQuiz({ onBack, isDarkMode }) {
//     const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isTyping, setIsTyping] = useState(false);
//   const [currentInput, setCurrentInput] = useState('');
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState('');
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const webcamRef = useRef(null);
//   const inputRef = useRef(null);

  

//   useEffect(() => {
//     setIsTyping(true);
//     const timer = setTimeout(() => {
//       setIsTyping(false);
//       inputRef.current?.focus();
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [currentQuestion]);

//   const handleAnswer = () => {
//     if (!currentInput.trim()) return;
    
//     setAnswers(prev => ({ ...prev, [questions[currentQuestion].text]: currentInput }));
//     setCurrentInput('');
    
//     if (currentQuestion < questions.length - 1) {
//       setTimeout(() => setCurrentQuestion(prev => prev + 1), 500);
//     } else {
//       setTimeout(() => setShowCamera(true), 500);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleAnswer();
//     }
//   };

//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       console.log('Captured image:', imageSrc?.slice(0, 50) + '...');
//     }
//   };

//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   if (showCamera) {
//     return (
//       <div className={`min-h-screen transition-all duration-500 ${
//         isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-100 to-purple-200'
//       }`}>
//         <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
//           <motion.div
//             className="h-full bg-purple-600"
//             initial={{ width: 0 }}
//             animate={{ width: '100%' }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>

//         <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="relative"
//           >
//             {/* <button
//               onClick={onBack}
//               className="absolute top-4 left-4 flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900"
//             >
//               <ArrowLeft className="mr-2 w-5 h-5" />
//               Back to Homepage
//             </button> */}

//             <div className="mb-4 text-center">
//               <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
//                 Facial Emotion Recognition
//               </h2>
//               <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 Let's capture your expression to better understand your mood
//               </p>
//             </div>

//             <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10">
//               {cameraError ? (
//                 <div className="p-8 text-center text-red-500">{cameraError}</div>
//               ) : (
//                 <Webcam
//                   ref={webcamRef}
//                   audio={false}
//                   screenshotFormat="image/jpeg"
//                   onUserMedia={() => setIsCameraReady(true)}
//                   onUserMediaError={(error) => setCameraError('Unable to access camera.')}
//                   className="w-full rounded-2xl"
//                 />
//               )}
//             </div>

//             <div className="mt-6 flex justify-center gap-4">
//               <button
//                 onClick={() => setShowCamera(false)}
//                 className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//               >
//                 Back to Quiz
//               </button>
//               {isCameraReady && (
//                 <button
//                   onClick={captureImage}
//                   className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
//                 >
//                   Capture Expression
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen transition-all duration-500 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-100 to-purple-200'
//     }`}>
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
//         <motion.div
//           className="h-full bg-purple-600"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.5 }}
//         />
//       </div>

//       <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
//       {/* <button
//   onClick={onBack}
//   className="absolute bottom-4 left-4 flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900"
// >
//   <ArrowLeft className="mr-2 w-5 h-5" />
//   Back to Homepage
// </button> */}
//  <button
//           onClick={() => navigate("/")} // ✅ Navigate to homepage
//           className="absolute bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//         >
//           <ArrowLeft className="mr-2 w-5 h-5" />
//           Back to Homepage
//         </button>


//         <AnimatePresence mode="wait">
//           {questions.slice(0, currentQuestion + 1).map((question, index) => (
//             <motion.div key={question.id} className="mb-8">
//               <div className="flex mb-4">
//                 <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
//                   {question.text}
//                 </div>
//               </div>

//               {index === currentQuestion ? (
//                 <motion.div className="flex gap-2">
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     value={currentInput}
//                     onChange={(e) => setCurrentInput(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder={question.placeholder}
//                     className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder-black-400"
//                   />
//                   <button onClick={handleAnswer} className="p-2 rounded-xl bg-purple-600 text-black">
//                     <Send className="w-5 h-5" />
//                   </button>
//                 </motion.div>
//               ) : (
//                 <p className="text-red-400">Your answer: {answers[question.text]}</p>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, Send } from "lucide-react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "How has your day been so far?",
    placeholder: "Tell me about your day...",
  },
  {
    id: 2,
    text: "What's the one emoji that best describes your mood?",
    placeholder: "Type or paste an emoji here...",
  },
  {
    id: 3,
    text: "What's your current mindset like?",
    placeholder: "Describe how you're feeling...",
  },
  {
    id: 4,
    text: "What is your preferred language for songs?",
    placeholder: "Enter your preferred language...",
  },
];

export default function EmotionQuiz({ isDarkMode }) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentInput, setCurrentInput] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const webcamRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, [currentQuestion]);

  const handleAnswer = () => {
    if (!currentInput.trim()) return;

    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].text]: currentInput,
    }));
    setCurrentInput("");

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 500);
    } else {
      setTimeout(() => setShowCamera(true), 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnswer();
    }
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("Captured image:", imageSrc?.slice(0, 50) + "...");
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showCamera) {
    return (
      <div
        className={`min-h-screen transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-900"
            : "bg-gradient-to-br from-pink-100 to-purple-200"
        }`}
      >
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
          <motion.div
            className="h-full bg-purple-600"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="mb-4 text-center">
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Facial Emotion Recognition
              </h2>
              <p
                className={`mt-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Let's capture your expression to better understand your mood
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10">
              {cameraError ? (
                <div className="p-8 text-center text-red-500">
                  {cameraError}
                </div>
              ) : (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  onUserMedia={() => setIsCameraReady(true)}
                  onUserMediaError={() => setCameraError("Unable to access camera.")}
                  className="w-full rounded-2xl"
                />
              )}
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setShowCamera(false)}
                className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
              >
                Back to Quiz
              </button>
              {isCameraReady && (
                <button
                  onClick={captureImage}
                  className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Capture Expression
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-pink-100 to-purple-200"
      }`}
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
        <motion.div
          className="h-full bg-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4">
        <button
          onClick={() => navigate("/")}
          className="absolute bottom-4 left-4 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back to Homepage
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={questions[currentQuestion].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex mb-4">
              <div className="max-w-[80%] bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tl-none">
                {questions[currentQuestion].text}
              </div>
            </div>

            <motion.div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={questions[currentQuestion].placeholder}
                className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-black placeholder-black-400"
              />
              <button
                onClick={handleAnswer}
                className="p-2 rounded-xl bg-purple-600 text-black"
              >
                <Send className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
