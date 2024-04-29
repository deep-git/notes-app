import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Welcome from './pages/Welcome/Welcome';

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Welcome />} />
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
    </Routes>
  </Router>
);

function App() {

  return (
    <div>
      {routes}
    </div>
  )
}

export default App
