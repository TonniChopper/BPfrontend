import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'sonner';
import Api from '../api/api.jsx';
import Navbar from "./Navbar.jsx";
import ParameterInfoModal from "./ParametrInfoModal.jsx";
import LoadingModal from "./LoadingModal.jsx";

// Example simulation card component
const ExampleCard = ({example, onApplyExample}) => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
        <img
            src={example.image}
            alt={example.title}
            className="w-full h-52 object-cover"
        />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-amber-400 mb-3">{example.title}</h3>
            <p className="text-gray-300 mb-6 flex-grow text-base">{example.description}</p>
            <button
                type="button"
                onClick={() => onApplyExample(example.parameters)}
                className="px-5 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-300 font-medium"
            >
                Использовать эти параметры
            </button>
        </div>
    </div>
);

ExampleCard.propTypes = {
    example: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        parameters: PropTypes.object.isRequired,
    }).isRequired,
    onApplyExample: PropTypes.func.isRequired,
};

const SimulationForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        length: '',
        width: '',
        depth: '',
        radius: '',
        num: '',
        element_size: '',
        e: '',
        Poisson_ratio: '',
        pressure: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pollingModalOpen, setPollingModalOpen] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [modalInfo, setModalInfo] = useState(null);
    const navigate = useNavigate();

    // Help text descriptions for each parameter
    const tooltips = {
        title: "Enter a descriptive name for your simulation.",
        length: "The 'length' parameter sets the length of the plate in millimetres [mm].\nThe holes are positioned along the length of the plate.",
        width: "The \"width\" parameter sets the width of the simulated plate in millimetres [mm].",
        depth: "The parameter sets the thickness of the simulated plate in millimetres [mm].",
        radius: "The parameter sets the radius of the holes in the simulated plate in millimetres (mm).\n\nMake sure the radii are appropriately sized relative to the dimensions, otherwise, the geometry cannot be created.",
        num: "The parameter sets the number of holes to be created.",
        elem_size: "The parameter sets the element size for the mesh in millimetres [mm].",
        e: "The parameter sets the value of Young's module in pascals [Pa]\n\n\n\nYoung's modulus, also known as the elastic modulus, is a measure of a material's stiffness. It describes how much a material will stretch or compress under a given force. Mathematically, it is the ratio of stress (force per unit area) to strain (relative deformation). A high Young's modulus means the material is very stiff and resists deformation (e.g., steel), while a low value indicates flexibility (e.g., rubber). It is a fundamental property in materials science and engineering for predicting how materials will behave under mechanical loads.",
        Poisson_ratio: "The parameter sets the value of Poisson's ratio\n\n\n\nPoisson's ratio is a measure of how a material changes in width or thickness when stretched or compressed. It is the ratio of lateral strain (sideways deformation) to axial strain (lengthwise deformation). When a material is stretched, it usually gets thinner; when compressed, it gets wider. Poisson's ratio quantifies this effect. Most materials have a Poisson's ratio between 0 and 0.5. A value of 0.5 means the material is incompressible (like rubber), while a value near 0 means little lateral change during deformation. It helps describe how materials behave under stress.",
        pressure: "The parameter sets the value of the pressure applied to the simulated structure.\n A positive value represents tension along the length of the structure, while a negative value represents compression."
    };

    // Example simulations to display
    const exampleSimulations = [
        {
            title: "Basic Structural Analysis",
            description: "Simple beam structural analysis showing stress distribution under load.",
            image: "/stress.png",
            parameters: {
                title: "Basic Structural Analysis",
                length: "5",
                width: "2.5",
                depth: "0.1",
                radius: "0.5",
                num: "3",
                element_size: "0.2",
                e: "2e11",
                Poisson_ratio: "0.3",
                pressure: "10000"
            }
        },
        {
            title: "Advanced Deformation Study",
            description: "Complex model showing deformation patterns under pressure.",
            image: "/deform.png",
            parameters: {
                title: "Advanced Deformation Study",
                length: "15",
                width: "5",
                depth: "0.5",
                radius: "1.5",
                num: "4",
                element_size: "0.3",
                e: "7e11",
                Poisson_ratio: "0.33",
                pressure: "50000"
            }
        }
    ];

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const toggleTooltip = (param) => {
        if (activeTooltip === param) {
            setActiveTooltip(null);
        } else {
            setActiveTooltip(param);
        }
    };

    const showParameterModal = (param) => {
        // Define which parameters should have documentation links
        const docsAvailable = {
            e: "https://en.wikipedia.org/wiki/Young%27s_modulus",
            Poisson_ratio: "https://en.wikipedia.org/wiki/Poisson's_ratio"
        };

        setModalInfo({
            title: param.charAt(0).toUpperCase() + param.slice(1),
            content: tooltips[param],
            // Only add docLink if it exists for this parameter
            docLink: docsAvailable[param] || null
        });
    };

    const applyExample = (parameters) => {
        const {title, ...restParameters} = parameters;
        setFormData({title, ...restParameters});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const convertedData = {
                length: parseFloat(formData.length),
                width: parseFloat(formData.width),
                depth: parseFloat(formData.depth),
                radius: parseFloat(formData.radius),
                num: parseInt(formData.num, 10),
                element_size: parseFloat(formData.element_size),
                e: parseFloat(formData.e),
                nu: parseFloat(formData.Poisson_ratio),
                pressure: parseFloat(formData.pressure)
            }

            const dataToSend = {
                title: formData.title,
                parameters: convertedData
            };

            const response = await Api.post('/myapp/simulations/', dataToSend);

            // Check if the response indicates async processing (status 202)
            if (response.status === 202) {
                toast.info('Симуляция принята в обработку');
                // Start polling for status updates
                const simulationId = response.data.id;
                setPollingModalOpen(true);
                pollSimulationStatus(simulationId);
            } else {
                // Regular completion - navigate to simulation details
                toast.success('Симуляция создана успешно!');
                navigate(`/simulations/${response.data.id}`);
            }
        } catch (err) {
            console.error('Submission error:', err);
            const errorMessage = err.response?.data?.detail || 'Ошибка отправки симуляции. Попробуйте снова.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const pollSimulationStatus = (simulationId) => {
        const pollingInterval = import.meta.env.VITE_POLLING_INTERVAL || 2000;

        // Poll every N seconds
        const interval = setInterval(async () => {
            try {
                const statusResponse = await Api.get(`/myapp/simulations/${simulationId}/status/`);
                const status = statusResponse.data.status;

                if (['COMPLETED', 'FAILED'].includes(status)) {
                    // Stop polling
                    clearInterval(interval);
                    setPollingModalOpen(false);

                    // Handle completion or failure
                    if (status === 'COMPLETED') {
                        toast.success('Симуляция завершена успешно!');
                        navigate(`/simulations/${simulationId}`);
                    } else {
                        toast.error('Симуляция завершилась с ошибкой');
                        setError('Обработка симуляции завершилась неудачно. Проверьте список симуляций.');
                    }
                }
            } catch (error) {
                // Handle error
                clearInterval(interval);
                setPollingModalOpen(false);
                const errorMsg = 'Ошибка проверки статуса симуляции. Проверьте список симуляций.';
                setError(errorMsg);
                toast.error(errorMsg);
                console.error('Status polling error:', error);
            }
        }, pollingInterval);
    };

    return (
        <>
            <Navbar/>
            <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-10 text-amber-400">Simulation Creator</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left example */}
                        <div className="hidden lg:block lg:self-start">
                            <ExampleCard example={exampleSimulations[0]} onApplyExample={applyExample}/>
                        </div>

                        {/* Central form */}
                        <div className="p-6 rounded-lg shadow-xl bg-gray-800">
                            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-300">New Simulation</h2>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {Object.keys(formData).map(key => (
                                    <div key={key} className="relative">
                                        <div className="flex items-center mb-1">
                                            <label htmlFor={key} className="text-sm text-gray-300">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </label>
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
                                        </div>
                                        <input
                                            id={key}
                                            type="text"
                                            name={key}
                                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-amber-500"
                                        />
                                        {activeTooltip === key && (
                                            <div
                                                className="absolute z-10 mt-1 p-2 bg-gray-900 border border-amber-500 rounded shadow-lg text-sm text-gray-300 max-w-xs">
                                                {/* Safe check for tooltips that might not exist */}
                                                {tooltips[key] ?
                                                    <>
                                                        {tooltips[key].split('\n')[0]}
                                                        {/* Only show "More info" if there are additional lines */}
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
                                                    </> :
                                                    `${key.charAt(0).toUpperCase() + key.slice(1)} parameter`
                                                }
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 rounded font-bold transition duration-300 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-amber-500 hover:bg-orange-500'}`}
                                >
                                    {loading ? 'Submitting...' : 'Submit Simulation'}
                                </button>
                            </form>
                        </div>
                        <ParameterInfoModal onClose={() => setModalInfo(null)} modalInfo={modalInfo}/>

                        {/* Right example */}
                        <div className="hidden lg:block lg:self-start">
                            <ExampleCard example={exampleSimulations[1]} onApplyExample={applyExample}/>
                        </div>

                        {/* Mobile view examples - only shown on smaller screens */}
                        <div className="lg:hidden col-span-1 space-y-8">
                            <h3 className="text-xl font-bold text-center text-indigo-300">Примеры симуляций</h3>
                            {exampleSimulations.map((example, index) => (
                                <ExampleCard key={index} example={example} onApplyExample={applyExample}/>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 text-center text-gray-400">
                        <p>Create custom FEA simulations by entering parameters above.</p>
                        <p>Examples shown can be used as starting points for your own models.</p>
                    </div>
                </div>
            </div>

            {/* Loading Modal for polling */}
            <LoadingModal isOpen={pollingModalOpen} />
        </>
    );
};

export default SimulationForm;