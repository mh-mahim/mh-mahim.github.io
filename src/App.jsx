// src/App.jsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { 
  FaGithub, FaEnvelope, FaPython, FaNetworkWired, FaAndroid, 
  FaTerminal, FaFacebook, FaLinkedin, FaCloudSun, FaRegClock, 
  FaSun, FaMoon, FaBars, FaTimes 
} from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

const App = () => {
  const { scrollYProgress } = useScroll();
  
  // States
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weather, setWeather] = useState({ temp: '--', condition: 'Fetching...' });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom Mouse Cursor State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Custom Cursor Tracker
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Weather, Clock & Auto Theme Effect
  useEffect(() => {
    // Auto Day/Night Theme Logic (সকাল ৬টা থেকে সন্ধ্যা ৬টা)
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setIsDarkMode(false); // Light Mode
    } else {
      setIsDarkMode(true);  // Dark Mode
    }

    // Fetch Weather
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true');
        const data = await res.json();
        setWeather({ temp: data.current_weather.temperature, condition: 'Bangladesh' });
      } catch (error) {
        setWeather({ temp: '28', condition: 'Bangladesh' }); 
      }
    };
    fetchWeather();

    // Clock Timer
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Form Submit Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    formData.append("access_key", "7abde9d8-6ab2-4387-8b68-4367cdfddbee");

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (response.ok) {
        alert("Success! Your message has been sent.");
        e.target.reset();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic Theme Classes
  const themeBg = isDarkMode ? "bg-[#0f172a] text-white selection:bg-accent" : "bg-slate-50 text-slate-800 selection:bg-primary";
  const glassNav = isDarkMode ? "bg-white/10 border-white/10 text-gray-200" : "bg-white/60 border-white/80 text-slate-600";
  const glassCard = isDarkMode ? "bg-white/5 border-white/10 text-gray-300" : "bg-white/60 border-white text-slate-700";
  const glassWidget = isDarkMode ? "bg-white/10 border-white/10 text-white" : "bg-white/70 border-white/80 text-slate-800";
  const headingColor = isDarkMode ? "text-white" : "text-slate-800";
  const subTextColor = isDarkMode ? "text-gray-300" : "text-slate-600";

  return (
    <div className={`relative min-h-screen transition-colors duration-1000 font-glass overflow-hidden ${themeBg}`}>
      
      {/* Custom Glass Mouse Cursor (Hidden on Mobile) */}
      <motion.div 
        className="hidden md:flex fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-blue-500 pointer-events-none z-[999] mix-blend-difference justify-center items-center"
        animate={{ x: mousePosition.x - 20, y: mousePosition.y - 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
      >
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
      </motion.div>

      {/* Top Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Animated Background Blobs based on Theme */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000">
        {isDarkMode ? (
          <>
            <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px]"></motion.div>
            <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px]"></motion.div>
          </>
        ) : (
          <>
            <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300/40 rounded-full mix-blend-multiply filter blur-[100px]"></motion.div>
            <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-300/40 rounded-full mix-blend-multiply filter blur-[120px]"></motion.div>
          </>
        )}
      </div>

      <div className="relative z-10">
        
        {/* Responsive Header */}
        <header className="fixed top-4 left-0 right-0 z-[70] flex justify-center px-4">
          <nav className={`w-full max-w-5xl px-6 py-3 rounded-2xl backdrop-blur-xl border shadow-lg flex justify-between items-center transition-all duration-700 ${glassNav}`}>
            <h1 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-sm font-nova cursor-none">
              M. H. Mahim
            </h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 font-bold text-base">
              <a href="#about" className="hover:text-blue-500 transition-colors cursor-none">About</a>
              <a href="#interests" className="hover:text-blue-500 transition-colors cursor-none">Interests</a>
              <a href="#projects" className="hover:text-blue-500 transition-colors cursor-none">Projects</a>
              <a href="#contactform" className="hover:text-blue-500 transition-colors cursor-none">Contact</a>
              
              {/* Manual Theme Toggle Button */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xl cursor-none"
                title="Toggle Theme Manually"
              >
                {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-purple-600" />}
              </button>
            </div>

            {/* Mobile Menu Toggle & Theme Button */}
            <div className="flex md:hidden items-center gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-black/10 transition-colors text-xl cursor-none">
                {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-purple-600" />}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-2xl p-1 cursor-none">
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </nav>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
              className={`absolute top-20 left-4 right-4 p-6 rounded-2xl backdrop-blur-xl border shadow-xl flex flex-col gap-4 font-bold text-center md:hidden z-[70] ${glassNav}`}
            >
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="#interests" onClick={() => setIsMobileMenuOpen(false)}>Interests</a>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
              <a href="#contactform" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </motion.div>
          )}
        </header>

        {/* Floating Centered Widget (Perfectly Centered & Sticky) */}
        <div className="fixed top-24 left-0 w-full flex justify-center z-[60] pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className={`pointer-events-auto flex items-center backdrop-blur-xl border shadow-xl rounded-full overflow-hidden divide-x ${isDarkMode ? 'divide-white/10' : 'divide-slate-200'} ${glassWidget}`}
          >
            {/* Weather Half */}
            <div className={`flex items-center gap-2 md:gap-3 p-3 px-4 md:px-6 transition-colors cursor-none ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'}`}>
              <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <FaCloudSun className="text-2xl md:text-3xl text-yellow-500 drop-shadow-sm" />
              </motion.div>
              <div className="text-left flex flex-col justify-center">
                <p className="text-lg md:text-xl font-bold font-nova">{weather.temp}°C</p>
                <p className={`text-[10px] md:text-xs tracking-wide uppercase font-bold ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{weather.condition}</p>
              </div>
            </div>

            {/* Clock Half */}
            <div className={`flex items-center gap-2 md:gap-3 p-3 px-4 md:px-6 transition-colors cursor-none ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'}`}>
              <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
                <FaRegClock className="text-2xl md:text-3xl text-purple-500 drop-shadow-sm" />
              </motion.div>
              <div className="text-left flex flex-col justify-center">
                <p className="text-md md:text-lg font-nova tracking-wider font-bold">
                  {currentTime.toLocaleTimeString([], { hour12: true })}
                </p>
                <p className={`text-[10px] md:text-xs tracking-wide uppercase font-bold ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Live Time</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="pt-56 pb-20 px-6 min-h-screen flex flex-col justify-center items-center text-center relative">
          
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="flex flex-col items-center">
            
            {/* Morphing Profile Shape Animation */}
            <div className="relative w-40 h-40 md:w-52 md:h-52 mb-10 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 opacity-60 blur-md transition-opacity duration-700 group-hover:opacity-80 ${isDarkMode ? 'bg-gradient-to-tr from-blue-500 to-purple-500' : 'bg-gradient-to-tr from-blue-400 via-purple-400 to-indigo-400'}`}
                style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
              />
              <motion.div 
                animate={{ borderRadius: ["50%", "15%", "50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-1.5 overflow-hidden border-[3px] shadow-xl flex items-center justify-center transition-colors duration-700 ${isDarkMode ? 'bg-slate-900 border-white/20' : 'bg-white border-white'}`}
              >
                <img 
                  src="./profile.png"

                  alt="Profile" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-none"
                />
              </motion.div>
            </div>

            <h2 className={`text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-sm transition-colors duration-700 ${headingColor}`}>
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 font-nova">M. H. Mahim</span>
            </h2>
            
            <div className={`text-xl md:text-3xl h-20 md:h-16 font-glass font-bold transition-colors duration-700 ${subTextColor}`}>
              <TypeAnimation
                sequence={[
                  'Electronics Engineering Student', 1500,
                  'Tech & Networking Enthusiast', 1500,
                  'Android Customization Geek', 1500,
                  'Curious Mind Exploring Code', 1500
                ]}
                wrapper="span" speed={50} repeat={Infinity}
              />
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 md:gap-6">
              <a href="#contactform" className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-center text-lg cursor-none">
                Let's Connect
              </a>
              <a href="https://github.com/mh-mahim" target="_blank" rel="noreferrer" className={`px-8 py-3 rounded-2xl backdrop-blur-md border font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-1 text-lg cursor-none duration-700 ${isDarkMode ? 'bg-white/10 border-white/10 text-white hover:bg-white/20' : 'bg-white/80 border-white text-slate-700 hover:text-blue-600 hover:bg-white'}`}>
                <FaGithub className="text-xl" /> GitHub
              </a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }} className={`text-3xl md:text-5xl font-bold mb-10 inline-block font-nova drop-shadow-sm transition-colors duration-700 ${headingColor}`}>
              About My Journey
            </motion.h3>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }} whileHover={{ scale: 1.02 }} className={`p-8 md:p-12 rounded-3xl backdrop-blur-xl border shadow-xl transition-all duration-700 ${glassCard}`}>
              <p className={`text-xl md:text-2xl leading-relaxed font-galada tracking-wide transition-colors duration-700 ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>
                বর্তমানে আমি ইলেকট্রনিক্স ইঞ্জিনিয়ারিং নিয়ে পড়াশোনা করছি। আমার প্রথাগত প্রফেশনাল এক্সপেরিয়েন্স হয়তো নেই, কিন্তু টেকনোলজির ভেতরের কাজগুলো কীভাবে হয়—তা জানার প্রতি আমার প্রবল আগ্রহ। হার্ডওয়্যার মডিফিকেশন থেকে শুরু করে লিনাক্স এনভায়রনমেন্ট এবং নেটওয়ার্কিং নিয়ে এক্সপেরিমেন্ট করতে আমি ভালোবাসি। প্রতিটি নতুন জিনিস শেখা এবং সেটি বাস্তবে প্রয়োগ করাই আমার মূল লক্ষ্য।
              </p>
            </motion.div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }} className={`text-3xl md:text-5xl font-bold mb-16 text-center font-nova drop-shadow-sm transition-colors duration-700 ${headingColor}`}>
              Tech Explorations
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { title: 'Terminal & CLI', icon: <FaTerminal />, desc: 'Termux, Linux commands & system tweaks', color: isDarkMode ? 'text-gray-300' : 'text-slate-700' },
                { title: 'Android Dev', icon: <FaAndroid />, desc: 'Custom ROMs, Rooting & deep OS modifications', color: 'text-green-500' },
                { title: 'Networking', icon: <FaNetworkWired />, desc: 'Port scanning, Cloudflare tunnels & local servers', color: 'text-blue-500' },
                { title: 'Python Basics', icon: <FaPython />, desc: 'Writing automation scripts and small tools', color: 'text-yellow-500' }
              ].map((skill, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }} whileHover={{ y: -10, scale: 1.03 }} className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-700 group shadow-lg cursor-none ${glassCard} ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-white/90'}`}>
                  {/* Slow & Smooth Floating Icon Animation */}
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    className={`text-5xl ${skill.color} mb-6 transition-transform drop-shadow-sm`}
                  >
                    {skill.icon}
                  </motion.div>
                  <h4 className={`text-2xl font-bold mb-3 font-nova transition-colors duration-700 ${headingColor}`}>{skill.title}</h4>
                  <p className={`text-lg leading-relaxed font-glass font-bold transition-colors duration-700 ${subTextColor}`}>{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }} className={`text-3xl md:text-5xl font-bold mb-16 text-center font-nova drop-shadow-sm transition-colors duration-700 ${headingColor}`}>
              DIY & Projects
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Project 1 */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut" }} whileHover={{ scale: 1.02 }} className={`backdrop-blur-xl rounded-3xl overflow-hidden border transition-all duration-700 flex flex-col shadow-xl cursor-none ${glassCard}`}>
                <div className={`h-56 flex items-center justify-center text-7xl relative overflow-hidden group transition-colors duration-700 ${isDarkMode ? 'bg-gradient-to-br from-blue-900/40 to-slate-800' : 'bg-gradient-to-br from-blue-100 to-blue-50'}`}>
                  <div className={`absolute inset-0 backdrop-blur-sm transition-all duration-700 group-hover:bg-transparent ${isDarkMode ? 'bg-white/5' : 'bg-white/20'}`}></div>
                  <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                    <BsLightningChargeFill className="text-yellow-500 drop-shadow-md relative z-10" />
                  </motion.div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className={`text-3xl font-bold mb-4 font-nova transition-colors duration-700 ${headingColor}`}>DIY Mini UPS for Router</h4>
                  <p className={`mb-6 flex-1 text-xl font-galada tracking-wide transition-colors duration-700 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>নিরবচ্ছিন্ন ইন্টারনেট সংযোগের জন্য নিজে হার্ডওয়্যার কম্পোনেন্ট জোড়া লাগিয়ে তৈরি করা রাউটারের মিনি ইউপিএস।</p>
                  <div className="flex gap-3 flex-wrap font-glass">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors duration-700 ${isDarkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-blue-100 border-blue-200 text-blue-800'}`}>Hardware</span>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors duration-700 ${isDarkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-purple-100 border-purple-200 text-purple-800'}`}>Electronics</span>
                  </div>
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} whileHover={{ scale: 1.02 }} className={`backdrop-blur-xl rounded-3xl overflow-hidden border transition-all duration-700 flex flex-col shadow-xl cursor-none ${glassCard}`}>
                <div className={`h-56 flex items-center justify-center text-7xl relative overflow-hidden group transition-colors duration-700 ${isDarkMode ? 'bg-gradient-to-br from-purple-900/40 to-slate-800' : 'bg-gradient-to-br from-purple-100 to-purple-50'}`}>
                  <div className={`absolute inset-0 backdrop-blur-sm transition-all duration-700 group-hover:bg-transparent ${isDarkMode ? 'bg-white/5' : 'bg-white/20'}`}></div>
                  <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
                    <FaNetworkWired className="text-blue-500 drop-shadow-md relative z-10" />
                  </motion.div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className={`text-3xl font-bold mb-4 font-nova transition-colors duration-700 ${headingColor}`}>Cloudflare Tunnel Setup</h4>
                  <p className={`mb-6 flex-1 text-xl font-galada tracking-wide transition-colors duration-700 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>Termux-এ Ubuntu ইন্সটল করে লোকাল সার্ভার এবং রাউটারকে Cloudflare Tunnel-এর মাধ্যমে ইন্টারনেটে লাইভ করা।</p>
                  <div className="flex gap-3 flex-wrap font-glass">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors duration-700 ${isDarkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-indigo-100 border-indigo-200 text-indigo-800'}`}>Linux</span>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors duration-700 ${isDarkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-teal-100 border-teal-200 text-teal-800'}`}>Networking</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contactform" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut" }} className={`p-8 md:p-12 rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-700 ${glassCard}`}>
              <h3 className={`text-3xl md:text-5xl font-bold mb-8 text-center font-nova drop-shadow-sm transition-colors duration-700 ${headingColor}`}>Send a Message</h3>
              <form className="flex flex-col gap-6 font-glass text-lg font-bold" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" required placeholder="Your Name" className={`w-full p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-500 shadow-sm cursor-none ${isDarkMode ? 'bg-white/10 border border-white/10 text-white placeholder-gray-400' : 'bg-white/80 border border-slate-200 text-slate-800 placeholder-slate-400'}`} />
                  <input type="email" name="email" required placeholder="Your Email" className={`w-full p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-500 shadow-sm cursor-none ${isDarkMode ? 'bg-white/10 border border-white/10 text-white placeholder-gray-400' : 'bg-white/80 border border-slate-200 text-slate-800 placeholder-slate-400'}`} />
                </div>
                <textarea name="message" required rows="5" placeholder="Your Message" className={`w-full p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-all duration-500 shadow-sm cursor-none ${isDarkMode ? 'bg-white/10 border border-white/10 text-white placeholder-gray-400' : 'bg-white/80 border border-slate-200 text-slate-800 placeholder-slate-400'}`}></textarea>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-xl font-nova shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed cursor-none">
                  {isSubmitting ? "Sending..." : "Submit Form"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className={`mt-10 border-t backdrop-blur-2xl pt-16 pb-8 px-6 transition-all duration-700 ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/50'}`}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 font-nova">
                M. H. Mahim
              </h2>
              <p className={`leading-relaxed text-lg font-glass font-bold transition-colors duration-700 ${subTextColor}`}>
                Exploring technology, tweaking Android systems, and building small, impactful DIY projects. Let's connect and share ideas!
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className={`text-2xl font-bold mb-4 font-nova transition-colors duration-700 ${headingColor}`}>Quick Links</h3>
              <div className={`flex flex-col gap-3 font-bold text-lg font-glass transition-colors duration-700 ${subTextColor}`}>
                <a href="#about" className="hover:text-blue-500 transition-colors cursor-none">About Journey</a>
                <a href="#interests" className="hover:text-blue-500 transition-colors cursor-none">Tech Explorations</a>
                <a href="#projects" className="hover:text-blue-500 transition-colors cursor-none">DIY Projects</a>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className={`text-2xl font-bold mb-4 font-nova transition-colors duration-700 ${headingColor}`}>Get In Touch</h3>
              <div className="flex gap-4">
                {[
                  { icon: <FaFacebook />, url: "https://facebook.com/m.h.mahim.facebook", color: "hover:text-[#1877F2] hover:border-blue-200" },
                  { icon: <FaLinkedin />, url: "https://linkedin.com/in/md-mahbub-hasan-mahim", color: "hover:text-[#0A66C2] hover:border-blue-200" },
                  { icon: <FaGithub />, url: "https://github.com/mh-mahim", color: "hover:text-slate-900 hover:border-slate-300 dark:hover:text-white" },
                  { icon: <FaEnvelope />, url: "mailto:mail.mhmahim@gmail.com", color: "hover:text-red-500 hover:border-red-200" }
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                    href={social.url} target="_blank" rel="noreferrer" 
                    className={`p-4 rounded-2xl text-2xl transition-all duration-500 shadow-md cursor-none ${isDarkMode ? 'bg-white/10 border border-white/10 text-gray-300 ' + social.color : 'bg-white border border-slate-100 text-slate-600 ' + social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          <div className={`text-right pt-8 border-t max-w-6xl mx-auto transition-colors duration-700 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <p className={`font-bold text-base font-nova transition-colors duration-700 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>© {new Date().getFullYear()} M. H. Mahim.</p>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
