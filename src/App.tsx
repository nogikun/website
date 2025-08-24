import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Works from './pages/Works';
import SNS from './pages/SNS';
import News from './pages/News';

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
      </Routes>
    </Router>
  );
}

export default App;
