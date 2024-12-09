import axios from "axios";
import PropTypes from "prop-types";

const FetchSimulation = ({ formData, setResult, setLoading, loading, simulationId }) => {
    const fetchData = async () => {
        setLoading(true);
        try {
            console.log('formData', formData);
            console.log('simulationId', simulationId);
            // Отправка данных на бэкенд с ID симуляции
            const postResponse = await axios.post('http://localhost:8000/myapp/graphs/', {
                ...formData,
                simulation_id: simulationId,
            });
            console.log('postResponse', postResponse);
            const graphId = postResponse.data.id;
            // Получение обработанных данных и изображения
            const response = await axios.get(`http://localhost:8000/myapp/graphs/${graphId}/`);
            setResult(response.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <button onClick={fetchData} disabled={loading}>
            {loading ? "Loading..." : "Solve"}
        </button>
    );
};

FetchSimulation.propTypes = {
    formData: PropTypes.object.isRequired,
    setResult: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    simulationId: PropTypes.number.isRequired,
};

export default FetchSimulation;