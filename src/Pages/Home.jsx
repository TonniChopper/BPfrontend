import {useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

const carouselItems = [
    {
        id: 1,
        title: "Advanced Simulations",
        description: "Run complex simulations with ease",
        image: "/fem_simulation1.jpg",
    },
    {
        id: 2,
        title: "Real-time Results",
        description: "Get instant feedback from your simulations",
        image: "/fem_simulation2.png",
    },
    {
        id: 3,
        title: "Multiple Options",
        description: "Choose from various simulation types",
        image: "/fem_simulation3.png",
    },
];

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex(current => (current + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white flex flex-col">
            <Navbar/>
            <div className="container mx-auto p-6 flex flex-col">
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8">
                        <div className="carousel h-[500px] mb-8 rounded-lg shadow-xl bg-gray-800 overflow-hidden relative">
                            {carouselItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`absolute w-full h-full transition-opacity duration-1000 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-center justify-center">
                                            <div className="text-center">
                                                <h2 className="text-4xl font-bold mb-4 text-amber-500">{item.title}</h2>
                                                <p className="text-xl mb-8">{item.description}</p>
                                                <Link to="/simulation">
                                                    <Button size="lg"
                                                            className="bg-indigo-600 border-0 text-white px-4 py-2 rounded hover:bg-indigo-500 transition">
                                                        Start Simulation
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <section className="bg-gray-800 rounded-lg p-8 mb-8 shadow-lg">
                            <h2 className="text-3xl font-bold mb-6 text-indigo-300">About Our Simulation Platform</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                                    <ul className="space-y-2">
                                        <li>\✓ Advanced simulation algorithms</li>
                                        <li>\✓ Real-time data processing</li>
                                        <li>\✓ Multiple simulation types</li>
                                        <li>\✓ Customizable parameters</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                                    <ul className="space-y-2">
                                        <li>\✓ Accurate results</li>
                                        <li>\✓ Time-efficient processing</li>
                                        <li>\✓ User-friendly interface</li>
                                        <li>\✓ Comprehensive analysis</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
            <Footer/>
        </div>
    );
};


export default Home;