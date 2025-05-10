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

            // Try a different endpoint format if needed
            // You might need to adjust this based on your actual API structure
            const endpoint = `http://localhost:8000/myapp/simulations/${simulationId}/result/download/`;

            const response = await axios.get(
                endpoint,
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

            // Get filename from Content-Disposition header if available
            const contentDisposition = response.headers['content-disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/["']/g, '')
                : `simulation_${simulationId}_results.zip`;

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Download error:', err);

            if (err.response?.status === 404) {
                setError('Download not available for this simulation');
            } else if (err.response?.status === 403) {
                setError('You do not have permission to download this file');
            } else {
                setError('Failed to download simulation results');
            }
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