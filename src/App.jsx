import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SimulationPage from './Pages/SimulationPage';
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import SimulationDetail from "./Components/SimulationDetail.jsx";
import SimulationDownload from "./Components/SimulationDownload.jsx";
import SimulationForm from "./Components/SimulationForm.jsx";
import SimulationStatus from "./Components/SimulationStatus.jsx";
import SimulationSelection from "./Pages/SimulationSelection.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";


function App() {
    return (
        <div className="App">
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route path="/simulation" element={
                    <ProtectedRoute>
                        <SimulationPage />
                    </ProtectedRoute>
                } />
                <Route path="/simulations" element={
                    <ProtectedRoute>
                        <SimulationSelection />
                    </ProtectedRoute>
                } />
                <Route path="/simulations/new" element={
                    <ProtectedRoute>
                        <SimulationForm />
                    </ProtectedRoute>
                } />
                <Route path="/simulations/:id" element={
                    <ProtectedRoute>
                        <SimulationDetail />
                    </ProtectedRoute>
                } />
                <Route path="/simulations/:id/status" element={
                    <ProtectedRoute>
                        <SimulationStatus />
                    </ProtectedRoute>
                } />
                <Route path="/simulations/:id/download" element={
                    <ProtectedRoute>
                        <SimulationDownload />
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    );
}

export default App;