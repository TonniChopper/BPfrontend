import PropTypes from 'prop-types';

const LoadingModal = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">Обработка симуляции</h3>
                <p className="text-gray-300">Пожалуйста, подождите, пока мы обрабатываем вашу симуляцию...</p>
            </div>
        </div>
    );
};

LoadingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default LoadingModal;

