import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SimulationList = () => {
    const [simulations, setSimulations] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:8000/simulations/', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => setSimulations(response.data))
                .catch(() => setError('Failed to load simulations.'));
        }
    }, [token]);

    return (
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-yellow-900 mb-4">Your Simulations</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {token ? (
                <>
                    <ul className="space-y-4">
                        {simulations.map(sim => (
                            <li key={sim.id} className="p-4 bg-gray-900 rounded shadow hover:shadow-xl">
                                <Link to={`/simulations/${sim.id}`} className="text-white">
                                    {sim.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <Link
                            to="/simulations/new"
                            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-orange-500 transition duration-300">
                            Create New Simulation
                        </Link>
                    </div>
                </>
            ) : (
                <p className="text-gray-300">Please log in to see your simulations.</p>
            )}
        </div>
    );
};

export default SimulationList;