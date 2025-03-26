import {useState} from 'react';
import Api from '../api/api.jsx';
import {useNavigate} from "react-router-dom";
import Loading from "../Components/Loading.jsx";
import Navbar from "../Components/Navbar.jsx";

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await Api.post('/myapp/user/registration/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/ProfilePage');
        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <Navbar/>
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Register</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400"
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {loading && <Loading/>}
                    <button
                        type="submit"
                        className={`w-full py-3 rounded font-bold ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-orange-500'} transition duration-300`}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Registration;