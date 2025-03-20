import { useState } from 'react';
import Api from '../api/api.jsx';
import { useNavigate } from 'react-router-dom';
import Loading from "../Components/Loading.jsx";
import Navbar from "../Components/Navbar.jsx";

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await Api.post('/learning/token/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/ProfilePage');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <Navbar />
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-300">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 rounded font-bold ${
                            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-orange-500'
                        } transition duration-300`}
                    >
                        {loading ? <Loading /> : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
