import React from "react";
import { motion } from "framer-motion";
import { Brain, Users, Wrench } from "lucide-react";

export default function HeroSection() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-green-600" />,
      title: "AI-Powered Reviews",
      desc: "Get instant feedback on efficiency, structure, and readability — powered by smart AI analysis.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Collaborative Insights",
      desc: "Work with real developers and refine your code with expert peer suggestions.",
    },
    {
      icon: <Wrench className="w-8 h-8 text-green-600" />,
      title: "Refactor Suggestions",
      desc: "Receive clean, practical improvements to make your code more maintainable.",
    },
  ];

  const handleScroll = () => {
    const section = document.getElementById("editor-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 min-h-[90vh] flex flex-col items-center justify-center px-6 py-16">
      <div className="absolute top-[-10rem] right-[-10rem] w-[30rem] h-[30rem] bg-green-300/30 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10rem] left-[-10rem] w-[25rem] h-[25rem] bg-green-200/30 blur-[130px] rounded-full" />

      <div className="relative max-w-6xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-slate-800 mb-4"
        >
          Elevate Your Code with{" "}
          <span className="text-green-600">CodeCritic</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Review smarter, collaborate faster, and deliver cleaner code — powered
          by AI and developer insight.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          <button
            onClick={handleScroll}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow-md transition-all"
          >
            Get Started
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-lg hover:shadow-xl rounded-2xl text-left"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {f.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
