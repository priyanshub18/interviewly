import { useState, useEffect } from "react";

interface ProfessionalLoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "rings" | "pulse" | "wave" | "dots" | "spiral";
  text?: string;
  showText?: boolean;
  className?: string;
}

export default function ProfessionalLoader({
  size = "md",
  variant = "rings",
  text = "Loading",
  showText = true,
  className = "",
}: ProfessionalLoaderProps) {
  const [dots, setDots] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
      setPulsePhase((prev) => (prev + 1) % 360);
    }, 400);

    return () => clearInterval(timer);
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const renderRingsVariant = () => (
    <div className={`relative ${sizeClasses[size]} mb-4`}>
      {/* Outer rotating ring */}
      <div
        className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"
        style={{ animationDuration: "1.2s" }}
      ></div>
      {/* Middle rotating ring */}
      <div
        className="absolute inset-0 border-r-4 border-blue-400 rounded-full animate-spin"
        style={{ animationDuration: "1.6s" }}
      ></div>
      {/* Inner rotating ring */}
      <div
        className="absolute inset-0 border-b-4 border-blue-300 rounded-full animate-spin"
        style={{ animationDuration: "2s" }}
      ></div>
      {/* Glowing center */}
      <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-80 animate-pulse"></div>
    </div>
  );

  const renderPulseVariant = () => (
    <div className={`relative ${sizeClasses[size]} mb-4`}>
      {/* Multiple pulsing circles */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping"
          style={{
            animationDelay: `${i * 0.3}s`,
            animationDuration: "2s",
          }}
        ></div>
      ))}
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full animate-pulse"></div>
    </div>
  );

  const renderWaveVariant = () => (
    <div
      className={`flex items-center justify-center gap-1 ${sizeClasses[size]} mb-4`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1 bg-blue-500 rounded-full animate-pulse"
          style={{
            height: `${size === "sm" ? "12px" : size === "md" ? "24px" : size === "lg" ? "36px" : "48px"}`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1s",
          }}
        ></div>
      ))}
    </div>
  );

  const renderDotsVariant = () => (
    <div
      className={`flex items-center justify-center gap-2 ${sizeClasses[size]} mb-4`}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s",
          }}
        ></div>
      ))}
    </div>
  );

  const renderSpiralVariant = () => (
    <div className={`relative ${sizeClasses[size]} mb-4`}>
      {/* Spiral animation */}
      <svg
        className="w-full h-full animate-spin"
        style={{ animationDuration: "2s" }}
        viewBox="0 0 100 100"
      >
        <path
          d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10"
          fill="none"
          stroke="url(#blueGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="251.2"
          strokeDashoffset="251.2"
          className="animate-dash"
          style={{ animationDuration: "2s" }}
        />
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case "pulse":
        return renderPulseVariant();
      case "wave":
        return renderWaveVariant();
      case "dots":
        return renderDotsVariant();
      case "spiral":
        return renderSpiralVariant();
      default:
        return renderRingsVariant();
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 rounded-xl bg-black shadow-2xl border border-gray-800 ${className}`}
    >
      {/* Main loader animation */}
      {renderVariant()}

      {/* Loading text with animated dots */}
      {showText && (
        <div
          className={`flex items-center text-white font-medium ${textSizes[size]}`}
        >
          <span>{text}</span>
          <span className="w-8 ml-1  text-white">
            {".".repeat(dots)}
          </span>
        </div>
      )}
    </div>
  );
}
