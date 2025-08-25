import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Works from './pages/Works';
import SNS from './pages/SNS';
import News from './pages/News';
import Ask from './pages/Ask';
import Lives from './pages/Lives';

// Import CSS files
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/sns" element={<SNS />} />
        <Route path="/news" element={<News />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/lives" element={<Lives />} />
      </Routes>
    </Router>
  );
}

export default App;
