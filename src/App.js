import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import MobileHome from "./components/Mobile";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Mobile" element={<MobileHome />} />
      </Routes>
    </Router>
  );
};

export default App;
