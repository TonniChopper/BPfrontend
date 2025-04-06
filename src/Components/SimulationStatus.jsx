import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SimulationStatus = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = () => {
      axios.get(`http://localhost:8000/myapp/simulations/${id}/status/`)
      .then(response => setStatus(response.data))
      .catch(() => setError('Failed to retrieve status.'));
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-black text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Simulation Status</h2>
        {status ? (
          <>
            <p className="mb-4">Status: {status.state}</p>
            {status.snapshot_url && (
              <img src={status.snapshot_url} alt="Snapshot" className="mx-auto rounded shadow-lg" />
            )}
          </>
        ) : (
          <p>Loading status...</p>
        )}
      </div>
    </div>
  );
};

export default SimulationStatus;