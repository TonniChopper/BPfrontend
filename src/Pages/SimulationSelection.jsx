import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

const SimulationSelection = () => {
  const [showInfo, setShowInfo] = useState(null);
  const navigate = useNavigate();

  // Available simulation types
  const simulationTypes = [
    {
      id: 'structural',
      name: 'Structural Analysis',
      image: '/fem_simulation1.jpg',
      description: 'Analyze stress and deformation in solid structures under various loads and boundary conditions. Perfect for engineering design validation and optimization.',
      details: [
        'Stress distribution analysis',
        'Deformation patterns visualization',
        'Support for various material properties',
        'Customizable boundary conditions',
        'Detailed numerical results'
      ]
    },
  ];

  const handleCreate = () => {
    navigate('/simulations/new');
  };

  const toggleInfo = (id) => {
    setShowInfo(showInfo === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white flex flex-col">
      <Navbar />
      <div className="container mx-auto p-6 flex-grow">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-amber-400">Select Simulation Type</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the type of simulation you want to create from the options below
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {simulationTypes.map((simulation) => (
            <div
              key={simulation.id}
              className="bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={simulation.image}
                  alt={simulation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{simulation.name}</h3>
              </div>

              <div className="p-5 flex-grow">
                <p className="text-gray-300 mb-4">{simulation.description}</p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleCreate()}
                    className="px-4 py-2 bg-amber-500 text-black font-bold rounded hover:bg-orange-500 transition-colors flex-grow"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => toggleInfo(simulation.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors"
                  >
                    {showInfo === simulation.id ? 'Less Info' : 'More Info'}
                  </button>
                </div>
              </div>

              {/* Expanded info section */}
              {showInfo === simulation.id && (
                <div className="p-5 bg-gray-700 border-t border-gray-600">
                  <h4 className="font-bold text-lg mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {simulation.details.map((detail, idx) => (
                      <li key={idx} className="text-gray-300">{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Coming soon placeholder card */}
          <div className="bg-gray-800/50 rounded-lg shadow-xl overflow-hidden flex flex-col border-2 border-dashed border-gray-600">
            <div className="h-48 flex items-center justify-center bg-gray-700/30">
              <div className="text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-gray-400 mb-2">More Simulation Types</h3>
              <p className="text-gray-500 text-center">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SimulationSelection;