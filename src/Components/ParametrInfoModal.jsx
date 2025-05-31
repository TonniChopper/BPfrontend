import PropTypes from 'prop-types';

const ParameterInfoModal = ({ modalInfo, onClose }) => {
    if (!modalInfo) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>

                <h3 className="text-2xl font-bold text-amber-400 mb-4">{modalInfo.title} Parameter</h3>

                <div className="prose prose-invert max-w-none mb-6">
                    {modalInfo.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                    ))}
                </div>

                <div className="flex justify-end">
                    {modalInfo.docLink && (
                        <a
                            href={modalInfo.docLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-300"
                        >
                            More Documentation
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

ParameterInfoModal.propTypes = {
    modalInfo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        docLink: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired
};

export default ParameterInfoModal;