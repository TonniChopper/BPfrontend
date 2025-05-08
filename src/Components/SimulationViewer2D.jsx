// eslint-disable-next-line react/prop-types
const SimulationViewer2D = ({ stages }) => {
    // eslint-disable-next-line react/prop-types
    if (!stages || stages.length === 0) {
        return <p className="text-gray-400">No simulation stages available.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* eslint-disable-next-line react/prop-types */}
            {stages.map((stage, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded shadow-lg">
                    <img
                        src={stage}
                        alt={`Simulation Stage ${index + 1}`}
                        className="w-full h-auto rounded"
                    />
                    <p className="text-center text-white mt-2">Stage {index + 1}</p>
                </div>
            ))}
        </div>
    );
};

export default SimulationViewer2D;