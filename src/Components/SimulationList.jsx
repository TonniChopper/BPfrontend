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

    return (
        <>
            <Navbar/>
            <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">Your Simulations</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {loading ? (
                    <div className="flex justify-center my-8">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
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
                                                <Link to={`/simulations/${sim.id}`}
                                                      className="text-white hover:text-yellow-400 block">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">Simulation #{sim.id}</span>
                                                        <span className="text-sm text-gray-300">Status: {sim.status}</span>
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-2">
                                                        Created: {new Date(sim.created_at).toLocaleString()}
                                                    </div>
                                                </Link>
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