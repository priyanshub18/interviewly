import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Spotify",
  "Stripe",
  "OpenAI",
  "Notion",
  "Figma",
  "Linear",
  "Vercel",
  "Hashnode",
  "Postman",
  "Supabase",
  "Pinecone",
  "Replit",
  "Loom",
  "Coda",
  "Mistral AI",
  "Anthropic",
  "Stability AI",
  "Sentry",
  "Turing",
  "Razorpay",
  "Zerodha",
  "Groww",
  "Unacademy",
  "Meesho",
  "Cred",
  "Zomato",
  "Swiggy",
];

export default function TrustedCompanies() {
  const controls = useAnimation();

  useEffect(() => {
    // Start animation when component mounts
    controls.start({
      x: "-100%",
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 100,
        ease: "linear",
      },
    });
  }, [controls]);

  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    controls.start({
      x: "-100%",
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 200,
        ease: "linear",
      },
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100/70 to-white dark:from-gray-900 dark:to-gray-800 border-y border-gray-200 dark:border-gray-700 overflow-hidden" id="trusted-companies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-blue-500 text-transparent bg-clip-text">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg mt-2">
            Empowering innovation with global tech leaders
          </p>
        </div>

        {/* Scrolling Marquee with group-hover Pause */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex gap-8 w-max"
            initial={{ x: "0%" }}
            animate={controls}
          >
            {/* First set of companies */}
            {companies.map((company, index) => (
              <CompanyCard key={`first-${index}`} company={company} />
            ))}

            {/* Duplicated set to create seamless loop */}
            {companies.map((company, index) => (
              <CompanyCard key={`second-${index}`} company={company} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Extracted CompanyCard component for cleaner code
function CompanyCard({ company } : {
    company: string;
}) {
  return (
    <motion.div
      className="min-w-[150px] px-4 py-4 rounded-xl bg-white/80 dark:bg-gray-900/60 
                 shadow-sm border-2 border-transparent 
                 group group-hover:border-gradient-to-r group-hover:from-blue-500 group-hover:to-blue-500 
                 group-hover:shadow-md backdrop-blur-md transition-all duration-300"
      whilegroup-hover={{
        scale: 1.02,
       
      }}
    >
      <div className="text-lg font-semibold text-gray-800 dark:text-white text-center">
        <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-group-hover:via-blue-500 group-hover:to-pink-500 transition-all duration-300">
          {company}
        </span>
      </div>
    </motion.div>
  );
}
