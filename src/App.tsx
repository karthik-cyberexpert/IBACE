import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Transport from './pages/Transport';
import Hostel from './pages/Hostel';
import Mba from './pages/Mba';
import Mca from './pages/Mca';
import Placement from './pages/Placement';
import Scholarships from './pages/Scholarships';
import Sports from './pages/Sports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/hostel" element={<Hostel />} />
        <Route path="/mba" element={<Mba />} />
        <Route path="/mca" element={<Mca />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/sports" element={<Sports />} />
      </Routes>
    </Router>
  )
}

export default App
