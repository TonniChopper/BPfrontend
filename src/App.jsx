import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SimulationPage from './Pages/SimulationPage';
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import SimulationDetail from "./Components/SimulationDetail.jsx";
import SimulationDownload from "./Components/SimulationDownload.jsx";
import SimulationForm from "./Components/SimulationForm.jsx";
import SimulationStatus from "./Components/SimulationStatus.jsx";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/simulation" element={<SimulationPage />} />
                <Route path="/simulations/new" element={<SimulationForm />} />
                <Route path="/simulations/:id" element={<SimulationDetail />} />
                <Route path="/simulations/:id/status" element={<SimulationStatus />} />
                <Route path="/simulations/:id/download" element={<SimulationDownload />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
    );
}

export default App;