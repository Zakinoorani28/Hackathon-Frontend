import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from '../src/pages/Auth';
import Home from '../src/pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
