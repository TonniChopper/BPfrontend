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
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
        id: 2,
        title: "Real-time Results",
        description: "Get instant feedback from your simulations",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
        id: 3,
        title: "Multiple Options",
        description: "Choose from various simulation types",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
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
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar/>
            <div className="container mx-auto p-6 flex flex-col">
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8">
                        <div className="carousel h-[500px] mb-8 rounded-lg shadow-xl bg-gray-900">
                            {carouselItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`carousel-item ${index === activeIndex ? "active" : "hidden"}`}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                            <div className="text-center">
                                                <h2 className="text-4xl font-bold mb-4 text-yellow-400">{item.title}</h2>
                                                <p className="text-xl mb-8">{item.description}</p>
                                                <Link to="/simulation">
                                                    <Button size="lg"
                                                            className="bg-yellow-500 border-0 text-black px-4 py-2 rounded hover:bg-orange-500 transition duration-300">
                                                        Start Simulation
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <section className="bg-gray-900 rounded-lg p-8 mb-8 shadow-lg">
                            <h2 className="text-3xl font-bold mb-6 text-yellow-400">About Our Simulation Platform</h2>
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