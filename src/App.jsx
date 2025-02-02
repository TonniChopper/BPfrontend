import { Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import SimulationPage from './Pages/SimulationPage';
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";

function App() {
    return (
        <div className="App">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/simulation" element={<SimulationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;