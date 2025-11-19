import {useState} from 'react';
import Api from '../api/api.jsx';
import {useNavigate} from "react-router-dom";
import { toast } from 'sonner';
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
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const validateForm = () => {
        if (formData.password.length < 6) {
            setError('Пароль должен содержать минимум 6 символов');
            toast.error('Пароль должен содержать минимум 6 символов');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            toast.error('Пароли не совпадают');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await Api.post('/myapp/user/registration/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            toast.success('Регистрация успешна! Добро пожаловать!');
            navigate('/');
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.detail
                || err.response?.data?.username?.[0]
                || err.response?.data?.email?.[0]
                || 'Ошибка регистрации. Попробуйте снова.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar/>
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Регистрация</h1>
                {error && <p className="text-red-500 mb-4 p-3 bg-red-900 bg-opacity-50 rounded">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400 disabled:opacity-50"
                        type="text"
                        name="username"
                        placeholder="Имя пользователя"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400 disabled:opacity-50"
                        type="text"
                        name="name"
                        placeholder="Имя"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400 disabled:opacity-50"
                        type="text"
                        name="surname"
                        placeholder="Фамилия"
                        value={formData.surname}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400 disabled:opacity-50"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400 disabled:opacity-50"
                        type="password"
                        name="password"
                        placeholder="Пароль (минимум 6 символов)"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        required
                        minLength={6}
                    />
                    <input
                        className="w-full p-3 rounded bg-gray-800 text-white focus:ring focus:ring-yellow-400 disabled:opacity-50"
                        type="password"
                        name="confirmPassword"
                        placeholder="Подтвердите пароль"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded font-bold ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-orange-500'} transition duration-300`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Loading size="sm" />
                                <span className="ml-2">Регистрация...</span>
                            </div>
                        ) : (
                            'Зарегистрироваться'
                        )}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-400">
                        Уже есть аккаунт?{' '}
                        <a href="/login" className="text-yellow-400 hover:text-yellow-300">
                            Войти
                        </a>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Registration;