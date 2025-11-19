import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'sonner';
import Api from '../api/api.jsx';
import { API_BASE_URL } from '../constants.js';

const SimulationDownload = ({simulationId}) => {
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // File types available for download
    const fileTypes = [
        {id: 'result', name: 'Text Results'},
        {id: 'stress', name: 'Stress'},
        {id: 'mesh', name: 'Mesh'},
        {id: 'deformation', name: 'Deformation'},
        {id: 'summary', name: 'Summary JSON'}
    ];

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const menuElement = document.getElementById(`download-menu-${simulationId}`);
            const buttonElement = document.getElementById(`download-button-${simulationId}`);

            if (menuOpen && menuElement && !menuElement.contains(event.target) &&
                buttonElement && !buttonElement.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen, simulationId]);

    const handleDownload = async (fileType) => {
        setDownloading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                const errorMsg = 'Не авторизован. Пожалуйста, войдите снова.';
                setError(errorMsg);
                toast.error(errorMsg);
                setDownloading(false);
                return;
            }

            const endpoint = `${API_BASE_URL}/myapp/simulations/${simulationId}/download/${fileType}/`;

            // Use Api to fetch the file with proper authentication headers
            const response = await Api({
                url: endpoint,
                method: 'GET',
                responseType: 'blob',
            });

            const contentType = response.headers['content-type'];
            // Create a URL for the blob data
            const blob = new Blob([response.data], { type: contentType || 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);

            // Determine filename from Content-Disposition header or fallback
            let filename = `simulation_${simulationId}_${fileType}`;
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const filenameMatch = /filename="?([^"]*)"?/.exec(contentDisposition);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            // Create download link and trigger it
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            setMenuOpen(false);

            toast.success(`Файл "${filename}" успешно загружен!`);
            setTimeout(() => setDownloading(false), 1000);
        } catch (err) {
            console.error('Download error:', err);
            const errorMsg = err.response?.status === 401
                ? 'Ошибка аутентификации. Войдите снова.'
                : 'Не удалось скачать файл';
            setError(errorMsg);
            toast.error(errorMsg);
            setDownloading(false);
        }
    };

    return (
        <div className="flex flex-col items-end">
            <div className="relative">
                <button
                    id={`download-button-${simulationId}`}
                    disabled={downloading}
                    className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-orange-500 transition duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span>{downloading ? 'Downloading...' : 'Download'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>

                <div
                    id={`download-menu-${simulationId}`}
                    className={`absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 ${menuOpen ? 'block' : 'hidden'}`}
                >
                    {fileTypes.map(type => (
                        <button
                            key={type.id}
                            onClick={() => handleDownload(type.id)}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                        >
                            {type.name}
                        </button>
                    ))}
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

SimulationDownload.propTypes = {
    simulationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default SimulationDownload;