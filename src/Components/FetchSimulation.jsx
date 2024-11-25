import axios from "axios";
import PropTypes from "prop-types";

const FetchSimulation = ({ formData, setResult, setLoading, loading }) => {
    const fetchData = async () => {
        setLoading(true);
        try {
            // Отправка данных на бэкенд
            const postResponse = await axios.post('http://localhost:8000/myapp/graphs/', formData);
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
};

export default FetchSimulation;