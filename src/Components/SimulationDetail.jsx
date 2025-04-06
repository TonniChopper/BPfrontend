import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import SimulationViewer from "./SimulationViewer.jsx";

const SimulationDetail = () => {
    const {id} = useParams();
    const [simulation, setSimulation] = useState(null);
    const [error, setError] = useState(null);
    const [resuming, setResuming] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/myapp/simulations/${id}/`)
            .then(response => setSimulation(response.data))
            .catch(() => setError('Failed to load simulation details.'));
    }, [id]);

    const handleResume = async () => {
        setResuming(true);
        try {
            await axios.post(`http://localhost:8000/myapp/simulations/${id}/resume/`);
            // Optionally update simulation state or redirect
        } catch (err) {
            setError('Failed to resume simulation.');
        }
        setResuming(false);
    };

    if (error) return <p className="p-8 text-red-500">{error}</p>;
    if (!simulation) return <p className="p-8 text-white">Loading simulation details...</p>;

    return (
        <div className="p-8 bg-gradient-to-b from-gray-800 to-black text-white min-h-screen flex flex-col items-center">
            <div className="w-full max-w-2xl p-8 rounded-lg shadow-xl bg-gray-800">
                <h2 className="text-3xl font-bold mb-4 text-amber-500">Simulation Detail</h2>
                <p className="mb-2">Title: {simulation.title}</p>
                <p className="mb-2">Parameters: {JSON.stringify(simulation.parameters)}</p>
                <p className="mb-4">Result: {simulation.result ? 'Available' : 'Pending'}</p>
                <button
                    onClick={handleResume}
                    disabled={resuming}
                    className={`px-4 py-2 rounded font-bold transition duration-300 ${resuming ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-orange-500'}`}
                >
                    {resuming ? 'Resuming...' : 'Resume Simulation'}
                </button>
                <SimulationViewer simulation={simulation} />
            </div>
        </div>
    );
};

export default SimulationDetail;