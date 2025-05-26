import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from "./Navbar.jsx";

const SimulationList = () => {
    const [simulations, setSimulations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSimulations = async () => {
            const token = localStorage.getItem('access_token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/myapp/simulations/', {
                    headers: {Authorization: `Bearer ${token}`}
                });

                // Ensure we have an array even if API returns an object
                const simulationsData = response.data.results || response.data || [];
                setSimulations(Array.isArray(simulationsData) ? simulationsData : []);
            } catch (err) {
                setError('Failed to load simulations.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSimulations();
    }, []);

    const handleDeleteSimulation = async (id) => {
        if (!window.confirm('Are you sure you want to delete this simulation?')) {
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://localhost:8000/myapp/simulations/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Remove from local state
            setSimulations(simulations.filter(sim => sim.id !== id));
        } catch (err) {
            console.error('Failed to delete simulation:', err);
            setError('Failed to delete simulation.');
        }
    };

    return (
        <>
            <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">Your Simulations</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {loading ? (
                    <div className="flex justify-center my-8">
                        <div
                            className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                ) : (
                    <>
                        {localStorage.getItem('access_token') ? (
                            <>
                                {simulations.length > 0 ? (
                                    <ul className="space-y-4">
                                        {simulations.map(sim => (
                                            <li key={sim.id}
                                                className="p-4 bg-gray-800 rounded shadow hover:shadow-xl transition-shadow duration-300">
                                                <div className="flex justify-between items-center">
                                                    <Link to={`/simulations/${sim.id}`}
                                                          className="text-white hover:text-yellow-400 block flex-grow">
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium">
                                                                {sim.title || `Simulation #${sim.id}`}
                                                            </span>
                                                            <span
                                                                className="text-sm text-gray-300">Status: {sim.status}</span>
                                                        </div>
                                                        <div className="text-xs text-gray-400 mt-2">
                                                            Created: {new Date(sim.created_at).toLocaleString()}
                                                        </div>
                                                    </Link>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteSimulation(sim.id);
                                                        }}
                                                        className="ml-4 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                                        title="Delete simulation"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-300 mb-6">No simulations found. Create your first one!</p>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-300 mb-6">Please log in to see your simulations.</p>
                        )}
                    </>
                )}

                <div className="mt-6">
                    <Link
                        to="/simulations"
                        className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-orange-500 transition duration-300">
                        Create New Simulation
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SimulationList;