import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SimulationDownload = ({simulationId}) => {
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // File types available for download
    const fileTypes = [
        {id: 'result', name: 'Text Results'},
        {id: 'geometry', name: 'Geometry'},
        {id: 'mesh', name: 'Mesh'},
        {id: 'results', name: 'Results Image'},
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
                setError('Not authenticated. Please log in again.');
                setDownloading(false);
                return;
            }

            const endpoint = `http://localhost:8000/myapp/simulations/${simulationId}/download/${fileType}/`;

            // Use axios to fetch the file with proper authentication headers
            const response = await axios({
                url: endpoint,
                method: 'GET',
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Create a URL for the blob data
            const blob = new Blob([response.data]);
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
            setTimeout(() => setDownloading(false), 1000);
        } catch (err) {
            console.error('Download error:', err);
            setError(err.response?.status === 401 ? 'Authentication failed. Please log in again.' : 'Failed to download file');
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