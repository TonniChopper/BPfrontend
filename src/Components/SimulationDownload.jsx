import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const SimulationDownload = ({ simulationId }) => {
  const [downloading, setDownloading] = useState(false);
  const token = localStorage.getItem('access_token'); // check authentication
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/simulations/${simulationId}/download/`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `simulation_${simulationId}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError('Download failed.');
    }
    setDownloading(false);
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleDownload}
        disabled={!token || downloading}
        className={`px-4 py-2 rounded font-bold transition duration-300 ${!token ? 'bg-gray-500 cursor-not-allowed' : downloading ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-orange-500'}`}
      >
        {downloading ? 'Downloading...' : 'Download Simulation'}
      </button>
      {!token && <p className="mt-2 text-gray-400">Download available for authenticated users only.</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default SimulationDownload;