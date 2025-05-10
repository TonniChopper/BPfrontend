import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import SimulationDownload from './SimulationDownload';
import SimulationViewer from './SimulationViewer';

const SimulationDetail = () => {
    const {id} = useParams();
    const [simulation, setSimulation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [resuming, setResuming] = useState(false);
    const [resumeError, setResumeError] = useState(null);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchSimulationDetails = async () => {
            try {
                const config = token ? {headers: {Authorization: `Bearer ${token}`}} : {};
                const response = await axios.get(`http://localhost:8000/myapp/simulations/${id}/`, config);
                setSimulation(response.data);
            } catch (err) {
                setError('Failed to load simulation details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSimulationDetails();
    }, [id, token]);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleResumeSimulation = async () => {
        setResuming(true);
        setResumeError(null);

        try {
            const response = await axios.post(
                `http://localhost:8000/myapp/simulations/${id}/resume/`,
                {},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            // Update the simulation status in the state
            setSimulation(prev => ({
                ...prev,
                status: 'RUNNING'
            }));

            // Show success message or trigger refresh
        } catch (err) {
            setResumeError('Failed to resume simulation. Please try again.');
            console.error(err);
        } finally {
            setResuming(false);
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-gray-900 min-h-screen">
                <div className="bg-red-900 text-white p-4 rounded-lg">{error}</div>
            </div>
        );
    }

    // Format dates
    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleString();
    };

    // Extract statistics from result summary if available
    const statistics = simulation.result_summary || {};

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                <h1 className="text-3xl font-bold text-amber-500 mb-6">
                    Simulation #{simulation.id}
                </h1>

                {/* Metadata section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <p className="mb-2"><span className="font-bold">Status:</span> {simulation.status || 'Unknown'}
                        </p>
                        <p className="mb-2"><span
                            className="font-bold">Created:</span> {formatDate(simulation.created_at)}</p>
                        <p className="mb-2"><span
                            className="font-bold">Completed:</span> {formatDate(simulation.completed_at)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                        <SimulationDownload simulationId={simulation.id}/>

                        {/* Resume button - only show for failed or certain status simulations */}
                        {(simulation.status === 'FAILED' || simulation.status === 'PENDING') && (
                            <div className="flex flex-col items-end">
                                <button
                                    onClick={handleResumeSimulation}
                                    disabled={resuming}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {resuming ? 'Resuming...' : 'Resume Simulation'}
                                </button>
                                {resumeError && <p className="text-red-500 text-sm mt-1">{resumeError}</p>}
                            </div>
                        )}
                    </div>
                </div>

                {/* Parameters section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-amber-400 mb-4">Parameters</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {simulation.parameters && Object.entries(simulation.parameters).map(([key, value]) => (
                            <div key={key} className="bg-gray-700 p-3 rounded-lg">
                                <p>
                                    <span className="font-bold">{key}:</span> {value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Statistics section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-amber-400 mb-4">Statistics</h2>
                    {simulation.has_result && statistics ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {statistics.max_displacement && (
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <p><span
                                        className="font-bold">Max Displacement:</span> {statistics.max_displacement}</p>
                                </div>
                            )}
                            {statistics.min_displacement && (
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <p><span
                                        className="font-bold">Min Displacement:</span> {statistics.min_displacement}</p>
                                </div>
                            )}
                            {statistics.avg_displacement && (
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <p><span
                                        className="font-bold">Avg Displacement:</span> {statistics.avg_displacement}</p>
                                </div>
                            )}
                            {statistics.max_stress && (
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <p><span className="font-bold">Max Stress:</span> {statistics.max_stress}</p>
                                </div>
                            )}
                            {statistics.min_stress && (
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <p><span className="font-bold">Min Stress:</span> {statistics.min_stress}</p>
                                </div>
                            )}
                            {statistics.avg_stress && (
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <p><span className="font-bold">Avg Stress:</span> {statistics.avg_stress}</p>
                                </div>
                            )}
                            {statistics.node_count && (
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <p><span className="font-bold">Node Count:</span> {statistics.node_count}</p>
                                </div>
                            )}
                            {statistics.element_count && (
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <p><span className="font-bold">Element Count:</span> {statistics.element_count}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-blue-900 text-white p-4 rounded-lg">Statistics not available</div>
                    )}
                </div>

                {/* Images section */}
                <div>
                    <h2 className="text-2xl font-bold text-amber-400 mb-4">Simulation Images</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {title: 'Geometry', url: simulation.geometry_image_url},
                            {title: 'Mesh', url: simulation.mesh_image_url},
                            {title: 'Results', url: simulation.results_image_url}
                        ].map((image) => (
                            <div key={image.title} className="bg-gray-700 rounded-lg overflow-hidden h-full">
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-3">{image.title}</h3>
                                    {image.url ? (
                                        <img
                                            src={image.url}
                                            alt={`${image.title} visualization`}
                                            className="w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
                                            onClick={() => handleImageClick(image.url)}
                                        />
                                    ) : (
                                        <div className="bg-blue-900 text-white p-4 rounded-lg">
                                            {image.title} image not available
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3D Model Viewer component if you add a model_url later */}
                {simulation.model_url && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">3D Model</h2>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <SimulationViewer modelUrl={simulation.model_url}/>
                        </div>
                    </div>
                )}
            </div>

            {/* Image modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 p-4 rounded-lg max-w-4xl w-full">
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-orange-500 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                        <img
                            src={selectedImage}
                            alt="Enlarged simulation view"
                            className="w-full h-auto rounded"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SimulationDetail;