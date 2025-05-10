import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const SimulationDownload = ({ simulationId }) => {
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setDownloading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');

            // Note: The trailing slash is important in Django URLs
            const endpoint = `http://localhost:8000/myapp/simulations/${simulationId}/download/all/`;

            // For direct browser download, create an invisible iframe instead of using axios
            // This approach avoids CORS issues with blob downloads
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            // Set the iframe source to the download URL with the authorization header
            // We'll use a form POST to include the authorization header
            const form = document.createElement('form');
            form.method = 'GET';
            form.action = endpoint;

            // Add Authorization header as a hidden field
            const authInput = document.createElement('input');
            authInput.type = 'hidden';
            authInput.name = 'Authorization';
            authInput.value = `Bearer ${token}`;
            form.appendChild(authInput);

            iframe.appendChild(form);
            form.submit();

            // Clean up the iframe after a delay
            setTimeout(() => {
                document.body.removeChild(iframe);
                setDownloading(false);
            }, 2000);

        } catch (err) {
            console.error('Download error:', err);

            if (err.message.includes('CORS')) {
                setError('CORS error: Unable to download from the server');
            } else if (err.response?.status === 404) {
                setError('Download not available for this simulation');
            } else if (err.response?.status === 403) {
                setError('You do not have permission to download this file');
            } else {
                setError('Failed to download simulation results');
            }
            setDownloading(false);
        }
    };

    // Alternative approach: open in a new tab
    const handleDownloadInNewTab = () => {
        setDownloading(true);
        try {
            const token = localStorage.getItem('access_token');
            const endpoint = `http://localhost:8000/myapp/simulations/${simulationId}/download/all/`;

            // Open in new tab and let the browser handle the download
            window.open(endpoint + `?bearer=${token}`, '_blank');

            setTimeout(() => setDownloading(false), 1000);
        } catch (err) {
            console.error(err);
            setError('Failed to initiate download');
            setDownloading(false);
        }
    };

    return (
        <div className="flex flex-col items-end">
            <button
                onClick={handleDownloadInNewTab} // Using the alternative approach by default
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