import { HeroSVG } from "./HeroSVG";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <main className="flex flex-col lg:flex-row-reverse justify-center items-center px-6 lg:px-20 pt-12 lg:pt-24 pb-16 lg:pb-32 text-white bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      
      {/* Animated SVG Illustration */}
      <div className="w-full lg:w-[40%] animate-fade-in-up">
        <HeroSVG />
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-[60%] text-center mt-8 lg:mt-0 animate-fade-in-down">
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">
          Hostel <span className="text-blue-500">Management</span> System
        </h1>
        <p className="py-6 text-lg md:text-xl lg:text-2xl text-gray-300 max-w-xl mx-auto">
          One Solution For All Of The Hostel&apos;s Needs
        </p>

        {/* Feature Highlights */}
        <div className="mt-6 space-y-5 text-center text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          {[
            "Simplified student registration and login process.",
            "Real-time mess attendance and request approval.",
            "Easily manage complaints, suggestions, and fees.",
          ].map((text, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 justify-center transition duration-300 hover:text-white"
            >
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm text-white font-semibold shadow-md">
                ✓
              </div>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center gap-6 animate-fade-in-up">
          <Link
            to="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white text-lg font-medium px-10 py-3 rounded-full shadow-lg w-72 text-center"
          >
            Login
          </Link>

          <span className="text-gray-400">OR</span>

          <Link
            to="/auth/request"
            className="bg-transparent border border-blue-400 hover:bg-blue-600 hover:border-blue-600 text-blue-400 hover:text-white transition duration-300 text-lg font-medium px-8 py-3 rounded-full w-72 text-center shadow-md"
          >
            Request Registration
          </Link>
        </div>
      </div>
    </main>
  );
}

export { HeroSection };
