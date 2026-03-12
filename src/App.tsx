import {BrowserRouter, Route, Routes} from 'react-router-dom';
import About from './pages/app/About';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import Portfolio from './pages/home';
import WorkPage from './pages/WorkPage';
import ProcessPage from './pages/ProcessPage';
import SiteFooter from './components/SiteFooter';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <SiteFooter />
    </BrowserRouter>
  );
}
