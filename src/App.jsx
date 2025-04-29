import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WatermarkPage from "./pages/WatermarkPage";
import BackgroundPage from "./pages/BackgroundPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
