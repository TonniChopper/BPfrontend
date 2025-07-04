import {useState} from 'react';
import SimulationList from '../Components/SimulationList';
import SimulationForm from '../Components/SimulationForm';
import Navbar from "../Components/Navbar.jsx";

const SimulationPage = () => {
    const [selectedSimulation, setSelectedSimulation] = useState(null);

    return (
        <>
            <Navbar/>
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white py-8">
            <div className="container mx-auto">
                {!selectedSimulation ? (
                    <SimulationList onSelect={setSelectedSimulation}/>
                ) : (
                    <SimulationForm simulationId={selectedSimulation}/>
                )}
            </div>
        </div>
        </>
    );
};

export default SimulationPage;