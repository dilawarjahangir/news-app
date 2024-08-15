import "./App.css";
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllNewsPage from "./pages/AllNewsPage.jsx";
import FunctionalPage from "./pages/FunctionalPage.jsx";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/all-news" element={<AllNewsPage/>} />
      <Route path="/all-functions" element={<FunctionalPage/>} />
    </Routes>
      <div className="text-green-400">
        
      </div>
    </Router>
  );
}

export default App;
