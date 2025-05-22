import React, { useState, useEffect } from "react";
import {
  Code,
  Calendar,
  Camera,
  MessageSquare,
  Users,
  Mic,
  Coffee,
  ArrowDown,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";

const Enhanced3DHeroSection = ({
  appName = "Interviewly",
  tagline = "Unlock Your Interview Potential",
  primaryblue = "#3b82f6",
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateOpacity = () => Math.max(0, 1 - scrollY / 1000);

  const features = [
    {
      title: "AI-Powered Interview Prep",
      description:
        "Generate personalized interview questions, simulate mock interviews, and get instant feedback using cutting-edge AI.",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
      color: "#8b5cf6",
    },
    {
      title: "Screen Sharing & Interview Mode",
      description:
        "Seamlessly conduct mock or real interviews with built-in screen sharing, timed questions, and evaluation tools.",
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500",
      color: "#3b82f6",
    },
    {
      title: "Sending Mail to Candidates",
      description:
        "Send personalized emails to candidates with their reminders, interview notes, and performance metrics.",
      icon: Target,
      gradient: "from-green-500 to-emerald-500",
      color: "#10b981",
    },
    {
      title: "Session Review Mechanism",
      description:
        "Revisit your interview recordings, AI-generated transcripts, and performance reviews to improve iteratively.",
      icon: Users,
      gradient: "from-orange-500 to-red-500",
      color: "#f97316",
    },
  ];

  const floatingIcons = [
    { Icon: Code, color: "#3b82f6", position: { bottom: "24%", right: "16%" } },
    {
      Icon: Calendar,
      color: "#8b5cf6",
      position: { bottom: "36%", right: "32%" },
    },
    {
      Icon: Camera,
      color: "#06b6d4",
      position: { bottom: "48%", left: "25%" },
    },
    {
      Icon: MessageSquare,
      color: "#10b981",
      position: { bottom: "16%", left: "12%" },
    },
    { Icon: Users, color: "#f59e0b", position: { bottom: "32%", left: "50%" } },
    { Icon: Mic, color: "#ef4444", position: { bottom: "40%", right: "25%" } },
    {
      Icon: Coffee,
      color: "#f59e0b",
      position: { bottom: "24%", left: "24%" },
    },
  ];

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Animated 3D Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Moving mesh gradient */}
        <div
          className="absolute inset-0 opacity-20 transition-transform duration-100"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, #1a1a1a 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #2a2a2a 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #333333 0%, transparent 50%)
            `,
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        />

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-10 transition-transform duration-100"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) rotateX(${mousePosition.y * 0.1}deg)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
        {/* Main Content with 3D Transform */}
        <div
          className="text-center pt-20 md:pt-24 relative z-10 transition-all duration-300"
          style={{
            opacity: calculateOpacity(),
            transform: `
              translateZ(80px) 
              rotateX(${mousePosition.y * 0.05}deg) 
              rotateY(${mousePosition.x * 0.05}deg)
            `,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Tagline with 3D effect */}
          <h2
            className={`text-xl md:text-2xl font-semibold text-gray-300 mb-4 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              textShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
              transform: "translateZ(30px)",
            }}
          >
            {tagline}
          </h2>

          {/* App Name with Enhanced 3D */}
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 text-white cursor-default transition-all duration-1000 hover:scale-105 ${
              isLoaded
                ? "opacity-100 translate-y-0 rotate-0"
                : "opacity-0 translate-y-12 -rotate-12"
            }`}
            style={{
              background: `linear-gradient(135deg, #000000, #1a1a1a, #333333)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 12px 48px rgba(0, 0, 0, 0.6)",
              transform: "translateZ(60px)",
              filter: "drop-shadow(0 0 30px rgba(0, 0, 0, 0.4))",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform =
                "translateZ(60px) rotateY(5deg) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform =
                "translateZ(60px) rotateY(0deg) scale(1)";
            }}
          >
            {appName}
          </h1>

          {/* Enhanced 3D CTA Button */}
          <div
            className={`flex justify-center items-center mb-16 transition-all duration-1200 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transform: "translateZ(40px)" }}
          >
            <button
              className="relative group bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 pointer-events-auto overflow-hidden hover:shadow-black/50"
              style={{
                boxShadow:
                  "0 15px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                transform: "translateZ(20px)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform =
                  "translateZ(30px) rotateY(8deg) scale(1.05)";
                (e.target as HTMLElement).style.boxShadow =
                  "0 25px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform =
                  "translateZ(20px) rotateY(0deg) scale(1)";
                (e.target as HTMLElement).style.boxShadow =
                  "0 15px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
              }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <span className="relative z-10 flex items-center text-lg">
                Scroll More to Know
                <ArrowDown size={20} className="ml-3 animate-bounce" />
              </span>
            </button>
          </div>

          {/* Enhanced 3D Feature Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12 px-4"
            style={{
              transform: "translateZ(30px)",
              transformStyle: "preserve-3d",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-700 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${index * 15}px)`,
                  transitionDelay: `${index * 200 + 800}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `translateZ(${index * 15 + 40}px) rotateY(8deg) rotateX(5deg) scale(1.03)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translateZ(${index * 15}px) rotateY(0deg) rotateX(0deg) scale(1)`;
                }}
              >
                {/* 3D Card Container */}
                <div className="relative bg-black/5 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-8 transition-all duration-500 group-hover:bg-black/10 group-hover:border-white/10 overflow-hidden">
                  {/* Animated gradient background */}
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                    }}
                  />

                  {/* Glowing border effect */}
                  <div
                    className="absolute -inset-0.5 opacity-0 group-hover:opacity-40 rounded-3xl blur-lg transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                    }}
                  />

                  <div className="relative flex items-start z-10">
                    {/* Enhanced 3D Icon */}
                    <div
                      className="p-6 rounded-2xl mr-6 shadow-lg relative overflow-hidden transition-all duration-500 hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}CC)`,
                        boxShadow: `0 15px 40px ${feature.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                        transform: "translateZ(25px)",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.transform =
                          "translateZ(35px) rotateY(15deg) rotateX(10deg)";
                        (e.target as HTMLElement).style.boxShadow = `0 20px 60px ${feature.color}60, inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.transform =
                          "translateZ(25px) rotateY(0deg) rotateX(0deg)";
                        (e.target as HTMLElement).style.boxShadow = `0 15px 40px ${feature.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
                      }}
                    >
                      {/* Icon shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <feature.icon
                        size={36}
                        className="text-white relative z-10 drop-shadow-lg"
                      />
                    </div>

                    <div className="text-left flex-1">
                      <h3 className="font-bold text-2xl text-white mb-3 group-hover:text-blue-100 transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 group-hover:text-gray-200 text-base leading-relaxed transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Floating particles inside cards */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-30 animate-pulse"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        backgroundColor: feature.color,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced 3D Floating Icons */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 md:h-2/5 overflow-visible">
          {floatingIcons.map((item, index) => (
            <div
              key={index}
              className="absolute transition-all duration-500 hover:scale-125"
              style={{
                ...item.position,
                transform: `translateZ(${30 + index * 10}px)`,
                animation: `float${index} ${4 + index}s ease-in-out infinite`,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = `translateZ(${50 + index * 10}px) rotateY(25deg) scale(1.2)`;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = `translateZ(${30 + index * 10}px) rotateY(0deg) scale(1)`;
              }}
            >
              <div
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-2xl border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                style={{
                  boxShadow: `0 12px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${item.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                }}
              >
                <item.Icon
                  size={28}
                  style={{ color: item.color }}
                  className="drop-shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced 3D Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => {
            const colors = [
              "#3b82f6",
              "#8b5cf6",
              "#06b6d4",
              "#10b981",
              "#f59e0b",
              "#ef4444",
            ];
            const color = colors[i % colors.length];
            const size = 2 + Math.random() * 4;
            const duration = 8 + Math.random() * 12;

            return (
              <div
                key={i}
                className="absolute rounded-full opacity-40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 ${size * 3}px ${color}`,
                  transform: `translateZ(${Math.random() * 100}px)`,
                  animation: `particle${i % 6} ${duration}s linear infinite`,
                }}
              />
            );
          })}
        </div>

        {/* Enhanced 3D Background Blobs */}
        <div
          className="absolute bottom-1/4 left-10 w-80 h-80 rounded-full bg-black/15 blur-3xl animate-pulse"
          style={{ transform: "translateZ(-200px)" }}
        />
        <div
          className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-gray-900/15 blur-3xl animate-pulse"
          style={{ transform: "translateZ(-250px)", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-88 h-88 rounded-full bg-black/15 blur-3xl animate-pulse"
          style={{ transform: "translateZ(-180px)", animationDelay: "2s" }}
        />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float0 {
          0%,
          100% {
            transform: translateY(0px) translateZ(30px) rotateZ(0deg);
          }
          50% {
            transform: translateY(-15px) translateZ(40px) rotateZ(5deg);
          }
        }
        @keyframes float1 {
          0%,
          100% {
            transform: translateY(-5px) translateZ(40px) rotateZ(-2deg);
          }
          50% {
            transform: translateY(-20px) translateZ(50px) rotateZ(3deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateY(-8px) translateZ(50px) rotateZ(3deg);
          }
          50% {
            transform: translateY(-25px) translateZ(60px) rotateZ(-4deg);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translateY(4px) translateZ(60px) rotateZ(-1deg);
          }
          50% {
            transform: translateY(-12px) translateZ(70px) rotateZ(2deg);
          }
        }
        @keyframes float4 {
          0%,
          100% {
            transform: translateY(-3px) translateZ(70px) rotateZ(4deg);
          }
          50% {
            transform: translateY(-18px) translateZ(80px) rotateZ(-3deg);
          }
        }
        @keyframes float5 {
          0%,
          100% {
            transform: translateY(6px) translateZ(80px) rotateZ(-3deg);
          }
          50% {
            transform: translateY(-14px) translateZ(90px) rotateZ(5deg);
          }
        }
        @keyframes float6 {
          0%,
          100% {
            transform: translateY(-5px) translateZ(90px) rotateZ(2deg);
          }
          50% {
            transform: translateY(-22px) translateZ(100px) rotateZ(-2deg);
          }
        }

        @keyframes particle0 {
          0% {
            transform: translateY(100vh) translateX(0) translateZ(0px)
              rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-20px) translateX(20px) translateZ(50px)
              rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes particle1 {
          0% {
            transform: translateY(100vh) translateX(0) translateZ(20px)
              rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-20px) translateX(-30px) translateZ(70px)
              rotate(-360deg);
            opacity: 0;
          }
        }
        @keyframes particle2 {
          0% {
            transform: translateY(100vh) translateX(0) translateZ(40px)
              rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-20px) translateX(15px) translateZ(90px)
              rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes particle3 {
          0% {
            transform: translateY(100vh) translateX(0) translateZ(10px)
              rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-20px) translateX(-20px) translateZ(60px)
              rotate(-180deg);
            opacity: 0;
          }
        }
        @keyframes particle4 {
          0% {
            transform: translateY(100vh) translateX(0) translateZ(30px)
              rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-20px) translateX(25px) translateZ(80px)
              rotate(270deg);
            opacity: 0;
          }
        }
        @keyframes particle5 {
          0% {
            transform: translateY(100vh) translateX(0) translateZ(50px)
              rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-20px) translateX(-15px) translateZ(100px)
              rotate(-270deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Enhanced3DHeroSection;
