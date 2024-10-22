import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Usuario from './pages/Usuario';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/usuario" element={<Usuario/>} />
      </Routes>
    </Router>
  );
}

export default App;
