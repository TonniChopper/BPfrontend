import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Api from '../api/api.jsx';

const SimulationStatus = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await Api.get(`/myapp/simulations/${id}/status/`);
        setStatus(response.data);
      } catch (err) {
        const errorMsg = 'Не удалось получить статус';
        setError(errorMsg);
        console.error(err);
      }
    };

    fetchStatus();
    const pollingInterval = import.meta.env.VITE_STATUS_POLLING_INTERVAL || 5000;
    const interval = setInterval(fetchStatus, pollingInterval);

    return () => clearInterval(interval);
  }, [id]);

  if (error) {
    return (
      <div className="p-8 bg-black text-white min-h-screen flex flex-col items-center">
        <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-lg shadow-xl text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Статус симуляции</h2>
        {status ? (
          <>
            <p className="mb-4 text-xl">Статус: <span className="font-bold text-amber-400">{status.state}</span></p>
            {status.snapshot_url && (
              <img src={status.snapshot_url} alt="Snapshot" className="mx-auto rounded shadow-lg" />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500 mr-4"></div>
            <p>Загрузка статуса...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationStatus;