import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SimulationForm = () => {
    const [formData, setFormData] = useState({
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
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // For authenticated users, include token
            const config = token ? {headers: {Authorization: `Bearer ${token}`}} : {};
            const response = await axios.post('http://localhost:8000/simulations/', formData, config);
            navigate(`/simulations/${response.data.id}`);
        } catch (err) {
            setError('Simulation submission failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-300">New Simulation</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(formData).map(key => (
                        <input
                            key={key}
                            type="text"
                            name={key}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-amber-500"
                        />
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
        </div>
    );
};

export default SimulationForm;