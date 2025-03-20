import {useState} from 'react';
import SimulationList from '../Components/SimulationList';
import SimulationForm from '../Components/SimulationForm';

const SimulationPage = () => {
    const [selectedSimulation, setSelectedSimulation] = useState(null);

    return (
        <div className="min-h-screen bg-black text-white py-8">
            <div className="container mx-auto">
                {!selectedSimulation ? (
                    <SimulationList onSelect={setSelectedSimulation}/>
                ) : (
                    <SimulationForm simulationId={selectedSimulation}/>
                )}
            </div>
        </div>
    );
};

export default SimulationPage;