import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SimulationDownload from './SimulationDownload';
import SimulationViewer from './SimulationViewer';
import Navbar from "./Navbar.jsx";
import ParameterInfoModal from "./ParametrInfoModal.jsx";

const SimulationDetail = () => {
    const { id } = useParams();
    const [simulation, setSimulation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [resuming, setResuming] = useState(false);
    const [resumeError, setResumeError] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [modalInfo, setModalInfo] = useState(null);
    const imageRef = useRef(null);
    const token = localStorage.getItem('access_token');

    const tooltips = {
        title: "Enter a descriptive name for your simulation.",
        length: "The 'length' parameter sets the length of the plate in millimetres [mm].\nThe holes are positioned along the length of the plate.",
        width: "The \"width\" parameter sets the width of the simulated plate in millimetres [mm].",
        depth: "The parameter sets the thickness of the simulated plate in millimetres [mm].",
        radius: "The parameter sets the radius of the holes in the simulated plate in millimetres (mm).\n\nMake sure the radii are appropriately sized relative to the dimensions, otherwise, the geometry cannot be created.",
        num: "The parameter sets the number of holes to be created.",
        elem_size: "The parameter sets the element size for the mesh in millimetres [mm].",
        e: "The parameter sets the value of Young's module in pascals [Pa]\n\n\n\nYoung's modulus, also known as the elastic modulus, is a measure of a material's stiffness. It describes how much a material will stretch or compress under a given force. Mathematically, it is the ratio of stress (force per unit area) to strain (relative deformation). A high Young's modulus means the material is very stiff and resists deformation (e.g., steel), while a low value indicates flexibility (e.g., rubber). It is a fundamental property in materials science and engineering for predicting how materials will behave under mechanical loads.",
        nu: "The parameter sets the value of Poisson's ratio\n\n\n\nPoisson's ratio is a measure of how a material changes in width or thickness when stretched or compressed. It is the ratio of lateral strain (sideways deformation) to axial strain (lengthwise deformation). When a material is stretched, it usually gets thinner; when compressed, it gets wider. Poisson's ratio quantifies this effect. Most materials have a Poisson's ratio between 0 and 0.5. A value of 0.5 means the material is incompressible (like rubber), while a value near 0 means little lateral change during deformation. It helps describe how materials behave under stress.",
        pressure: "The parameter sets the value of the pressure applied to the simulated structure.\n A positive value represents tension along the length of the structure, while a negative value represents compression."
    };
    const statisticTooltips = {
        max_displacement: "The result represents maximal displacement of node in model.\nThe maximum displacement represents the largest deformation experienced by any point in the model.\nMeasured in millimeters [mm].\n\nThis value indicates where the structure is most susceptible to deformation under the applied load conditions.",
        min_displacement: "The result represents minimal displacement of node in model. \nThe minimum displacement represents the smallest deformation experienced in the model.\nMeasured in millimeters [mm].\n\nThis typically occurs in fixed areas or areas furthest from applied loads.",
        avg_displacement: "The result represents average displacement of node in model. \nThe average displacement across all nodes in the model.\nMeasured in millimeters [mm].\n\nThis provides an overview of the general deformation behavior of the structure.",
        max_stress: "The maximum stress represents the highest mechanical stress experienced in the model.\nMeasured in megapascals [MPa].\n\nHigh stress concentrations indicate potential failure points in the structure.",
        min_stress: "The minimum stress represents the lowest mechanical stress experienced in the model.\nMeasured in megapascals [MPa].\n\nThese areas experience minimal mechanical loading.",
        avg_stress: "The average stress across all elements in the model.\nMeasured in megapascals [MPa].\n\nThis provides an overview of the general stress distribution in the structure.",
        node_count: "The result represents number of nodes in model. \nThe total number of nodes in the finite element mesh.\n\nNodes are the points where elements connect and where displacement values are calculated.",
        element_count: "The result represents number of elements in model. \nThe total number of elements in the finite element mesh.\n\nElements are the discrete components that make up the mesh and where stresses are calculated."
    };

    const docLinks = {
        e: "https://en.wikipedia.org/wiki/Young%27s_modulus",
        Poisson_ratio: "https://en.wikipedia.org/wiki/Poisson%27s_ratio"
    };

    const toggleTooltip = (key) => {
        if (activeTooltip === key) {
            setActiveTooltip(null);
        } else {
            setActiveTooltip(key);
        }
    };
    const showStatisticModal = (stat) => {
        setModalInfo({
            title: stat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            content: statisticTooltips[stat] || `No detailed information available for ${stat}.`,
            docLink: docLinks[stat] || null
        });
    };
    const showParameterModal = (param) => {
        setModalInfo({
            title: param.charAt(0).toUpperCase() + param.slice(1),
            content: tooltips[param],
            docLink: docLinks[param] || null
        });
    };
    useEffect(() => {
        const fetchSimulationDetails = async () => {
            try {
                const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
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
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.25, 4));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    };

    const handleMouseDown = (e) => {
        if (zoomLevel > 1) {
            setIsPanning(true);
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const handleMouseMove = (e) => {
        if (isPanning && imageRef.current) {
            setPosition(prevPos => ({
                x: prevPos.x + e.movementX,
                y: prevPos.y + e.movementY
            }));
        }
    };

    const handleResumeSimulation = async () => {
        setResuming(true);
        setResumeError(null);

        try {
            await axios.post(
                `http://localhost:8000/myapp/simulations/${id}/resume/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update the simulation status in the state
            setSimulation(prev => ({
                ...prev,
                status: 'RUNNING'
            }));
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
            <Navbar/>
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                <h1 className="text-3xl font-bold text-amber-500 mb-6">
                    {simulation.title}
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
                        {simulation.status === 'COMPLETED' ? (
                            <SimulationDownload simulationId={simulation.id}/>
                        ) : (
                            <button
                                disabled
                                className="px-4 py-2 bg-gray-600 text-gray-300 rounded cursor-not-allowed opacity-50"
                            >
                                Results Not Available
                            </button>
                        )}

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
                            <div key={key} className="bg-gray-700 p-3 rounded-lg relative">
                                <div className="flex items-center justify-between">
                                    <p>
                                        <span className="font-bold">{key}:</span> {value}
                                    </p>
                                    {tooltips[key] && (
                                        <button
                                            type="button"
                                            className="ml-2 text-gray-400 hover:text-amber-500 focus:outline-none"
                                            onClick={() => toggleTooltip(key)}
                                            aria-label={`Help for ${key}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z"/>
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {activeTooltip === key && tooltips[key] && (
                                    <div
                                        className="absolute z-10 mt-1 p-2 bg-gray-900 border border-amber-500 rounded shadow-lg text-sm text-gray-300 max-w-xs right-0">
                                        {tooltips[key].split('\n')[0]}
                                        {tooltips[key].includes('\n') && (
                                            <button
                                                onClick={() => {
                                                    setActiveTooltip(null);
                                                    showParameterModal(key);
                                                }}
                                                className="block mt-2 text-amber-400 hover:underline text-xs"
                                            >
                                                More info →
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Statistics section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-amber-400 mb-4">Statistics</h2>
                    {simulation.has_result && statistics ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(statistics).map(([key, value]) => (
                                <div key={key} className="bg-gray-700 p-3 rounded-lg relative">
                                    <div className="flex items-center justify-between">
                                        <p>
                                            <span
                                                className="font-bold">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span> {value}
                                        </p>
                                        {statisticTooltips[key] && (
                                            <button
                                                type="button"
                                                className="ml-2 text-gray-400 hover:text-amber-500 focus:outline-none"
                                                onClick={() => toggleTooltip(`stat_${key}`)}
                                                aria-label={`Help for ${key}`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z"/>
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    {activeTooltip === `stat_${key}` && statisticTooltips[key] && (
                                        <div
                                            className="absolute z-10 mt-1 p-2 bg-gray-900 border border-amber-500 rounded shadow-lg text-sm text-gray-300 max-w-xs right-0">
                                            {statisticTooltips[key].split('\n')[0]}
                                            {statisticTooltips[key].includes('\n') && (
                                                <button
                                                    onClick={() => {
                                                        setActiveTooltip(null);
                                                        showStatisticModal(key);
                                                    }}
                                                    className="block mt-2 text-amber-400 hover:underline text-xs"
                                                >
                                                    More info →
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
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
                            {title: 'Mesh', url: simulation.mesh_image_url},
                            {title: 'Deformation', url: simulation.deformation_image_url},
                            {title: 'Stress', url: simulation.stress_image_url}
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

            {/* Enhanced Image modal with zoom/pan functionality */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 p-4 rounded-lg max-w-[90vw] max-h-[90vh] w-full h-full flex flex-col">
                        <div className="flex justify-between mb-2 items-center">
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleZoomIn}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                                <button
                                    onClick={handleZoomOut}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                                <span className="px-4 py-2 bg-gray-700 text-white rounded">
                                    Zoom: {Math.round(zoomLevel * 100)}%
                                </span>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-orange-500 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                        <div
                            className="flex-1 overflow-hidden relative bg-gray-900 rounded"
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onMouseMove={handleMouseMove}
                        >
                            <div
                                className="absolute cursor-move"
                                style={{
                                    transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                                    transformOrigin: 'center',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <img
                                    ref={imageRef}
                                    src={selectedImage}
                                    alt="Enlarged simulation view"
                                    className="max-w-full max-h-full object-contain"
                                    draggable="false"
                                />
                            </div>
                        </div>
                        <div className="text-gray-300 text-sm mt-2 text-center">
                            Drag to pan when zoomed in. Use zoom buttons to magnify details.
                        </div>
                    </div>
                </div>
            )}
            {/* Parameter info modal */}
            <ParameterInfoModal
                modalInfo={modalInfo}
                onClose={() => setModalInfo(null)}
            />
        </div>
    );
}
export default SimulationDetail;
