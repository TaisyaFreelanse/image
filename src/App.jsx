import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WatermarkPage from "./pages/WatermarkPage";
import BackgroundPage from "./pages/BackgroundPage";
import LoginPage from "./pages/LoginPage";
import ProcessPage from "./pages/ProcessPage";
import ProcessBackground from "./pages/ProcessBackground";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner"; 

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/remove-watermarks" element={<WatermarkPage />} />
        <Route path="/remove-background" element={<BackgroundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/process-background" element={<ProcessBackground />} />
      </Routes>
      <CookieBanner /> {}
      <Footer />
    </>
  );
}

export default App;
