import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feedback from './pages/Feedback';

function App() {
  return (
    <div className="min-h-screen bg-background text-gray-900 font-sans">
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
