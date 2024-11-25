import { Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import SimulationPage from './Pages/SimulationPage';

function App() {
    return (
        <div className="App">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/simulation" element={<SimulationPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;