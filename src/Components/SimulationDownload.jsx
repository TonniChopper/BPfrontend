import {useState} from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const SimulationDownload = ({simulationId}) => {
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setDownloading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(
                `http://localhost:8000/myapp/simulations/${simulationId}/download/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: 'blob'
                }
            );

            // Create a blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `simulation_${simulationId}_results.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError(err.response?.status === 404
                ? 'Download not available for this simulation'
                : 'Failed to download simulation results');
            console.error(err);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="flex flex-col items-end">
            <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-orange-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {downloading ? 'Downloading...' : 'Download Results'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default SimulationDownload;