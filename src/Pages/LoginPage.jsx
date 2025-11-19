import { useState } from 'react';
import Api from '../api/api.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Loading from "../Components/Loading.jsx";
import Navbar from "../Components/Navbar.jsx";

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page they were trying to access, or default to home
    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await Api.post('/myapp/token/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            toast.success('Вход выполнен успешно!');

            // Redirect to the page they were trying to access
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.detail || 'Ошибка входа. Проверьте логин и пароль.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6">Вход</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-300">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400 disabled:opacity-50"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400 disabled:opacity-50"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded font-bold ${
                            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-orange-500'
                        } transition duration-300`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Loading size="sm" />
                                <span className="ml-2">Вход...</span>
                            </div>
                        ) : (
                            'Войти'
                        )}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-400">
                        Нет аккаунта?{' '}
                        <a href="/register" className="text-yellow-400 hover:text-yellow-300">
                            Зарегистрироваться
                        </a>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;
