// src/Pages/SimulationPage.jsx
import { useState } from 'react';
import SimulationList from '../Components/SimulationList';
import SimulationForm from '../Components/SimulationForm';
import { Container } from 'react-bootstrap';

const SimulationPage = () => {
    const [selectedSimulation, setSelectedSimulation] = useState(null);

    return (
        <Container className="my-5">
            {!selectedSimulation ? (
                <SimulationList onSelect={setSelectedSimulation} />
            ) : (
                <SimulationForm simulationId={selectedSimulation} />
            )}
        </Container>
    );
};

export default SimulationPage;