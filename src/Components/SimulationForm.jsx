import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import PropTypes from "prop-types";
import Navbar from "./Navbar.jsx";

const SimulationForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        length: '',
        width: '',
        depth: '',
        radius: '',
        num: '',
        e: '',
        nu: '',
        pressure: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    // Help text descriptions for each parameter
    const tooltips = {
        length: "The length of the simulation domain in meters.",
        width: "The width of the simulation domain in meters.",
        depth: "The depth of the simulation domain in meters.",
        radius: "The radius of the cylindrical feature in meters.",
        num: "Number of elements to use in the simulation mesh.",
        e: "Young's modulus (E) in Pascal, describing material stiffness.",
        nu: "Poisson's ratio (ν), dimensionless elastic constant (0.0-0.5).",
        pressure: "Applied pressure in Pascal."
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
                e: "2e11",
                nu: "0.3",
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
                e: "7e11",
                nu: "0.33",
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

    const applyExample = (parameters) => {
        setFormData(parameters);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const convertedData = {
                title: formData.title,
                length: parseFloat(formData.length),
                width: parseFloat(formData.width),
                depth: parseFloat(formData.depth),
                radius: parseFloat(formData.radius),
                num: parseInt(formData.num, 10),
                e: parseFloat(formData.e),
                nu: parseFloat(formData.nu),
                pressure: parseFloat(formData.pressure)
            }
            const config = token ? {headers: {Authorization: `Bearer ${token}`}} : {};
            const dataToSend = {parameters: convertedData}
            const response = await axios.post('http://localhost:8000/myapp/simulations/', dataToSend, config);
            navigate(`/simulations/${response.data.id}`);
        } catch (err) {
            setError('Simulation submission failed. Please try again.');
        }
        setLoading(false);
    };

    // Example simulation card component
    const ExampleCard = ({example}) => (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
            <img
                src={example.image}
                alt={example.title}
                className="w-full h-52 object-cover" // Increased height from h-40 to h-52
            />
            <div className="p-6 flex flex-col flex-grow"> {/* Increased padding from p-4 to p-6 */}
                <h3 className="text-2xl font-bold text-amber-400 mb-3">{example.title}</h3> {/* Increased text size and margin */}
                <p className="text-gray-300 mb-6 flex-grow text-base">{example.description}</p> {/* Increased margin and specified text size */}
                <button
                    type="button"
                    onClick={() => applyExample(example.parameters)}
                    className="px-5 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-300 font-medium" // Increased padding and added font-medium
                >
                    Use These Parameters
                </button>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-10 text-amber-400">Simulation Creator</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10"> {/* Increased gap from gap-8 to gap-10 */}
                    {/* Left example */}
                    <div className="hidden lg:block lg:self-start">
                        <ExampleCard example={exampleSimulations[0]}/>
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
                                            {tooltips[key]}
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

                    {/* Right example */}
                    <div className="hidden lg:block lg:self-start">
                        <ExampleCard example={exampleSimulations[1]}/>
                    </div>

                    {/* Mobile view examples - only shown on smaller screens */}
                    <div className="lg:hidden col-span-1 space-y-8">
                        <h3 className="text-xl font-bold text-center text-indigo-300">Example Simulations</h3>
                        {exampleSimulations.map((example, index) => (
                            <ExampleCard key={index} example={example}/>
                        ))}
                    </div>
                </div>

                <div className="mt-10 text-center text-gray-400">
                    <p>Create custom FEA simulations by entering parameters above.</p>
                    <p>Examples shown can be used as starting points for your own models.</p>
                </div>
            </div>
        </div>
        </>
    );
};

SimulationForm.propTypes = {
    example: PropTypes.array,
}

export default SimulationForm;