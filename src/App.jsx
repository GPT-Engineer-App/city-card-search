import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Cities from "./pages/Cities.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/cities" element={<Cities />} />
      </Routes>
    </Router>
  );
}

export default App;
