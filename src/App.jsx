import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';

// Tools Pages
import CgpaCalculator from './pages/tools/CgpaCalculator';
import AttendanceCalculator from './pages/tools/AttendanceCalculator';
import AgeCalculator from './pages/tools/AgeCalculator';
import BmiCalculator from './pages/tools/BmiCalculator';
import QrCodeGenerator from './pages/tools/QrCodeGenerator';
import PasswordGenerator from './pages/tools/PasswordGenerator';
import JsonFormatter from './pages/tools/JsonFormatter';
import WordCounter from './pages/tools/WordCounter';
import ImageCompressor from './pages/tools/ImageCompressor';
import ImageToPdf from './pages/tools/ImageToPdf';
import PdfCompressor from './pages/tools/PdfCompressor';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/tools/cgpa-calculator" element={<CgpaCalculator />} />
            <Route path="/tools/attendance-calculator" element={<AttendanceCalculator />} />
            <Route path="/tools/age-calculator" element={<AgeCalculator />} />
            <Route path="/tools/bmi-calculator" element={<BmiCalculator />} />
            <Route path="/tools/qr-code-generator" element={<QrCodeGenerator />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/tools/pdf-compressor" element={<PdfCompressor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
