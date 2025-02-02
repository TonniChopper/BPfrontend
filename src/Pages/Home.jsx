import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
            setActiveIndex((current) => (current + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                    <div className="carousel h-[500px] mb-8 rounded-lg shadow-xl">
                        {carouselItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                            >
                                <div className="relative w-full h-full">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded-lg">
                                        <div className="text-center">
                                            <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                                            <p className="text-xl mb-8">{item.description}</p>
                                            <Link to="/simulation">
                                                <Button size="lg">Start Simulation</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Information Section */}
                    <section className="bg-secondary rounded-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold mb-6">About Our Simulation Platform</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                                <ul className="space-y-2">
                                    <li>✓ Advanced simulation algorithms</li>
                                    <li>✓ Real-time data processing</li>
                                    <li>✓ Multiple simulation types</li>
                                    <li>✓ Customizable parameters</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                                <ul className="space-y-2">
                                    <li>✓ Accurate results</li>
                                    <li>✓ Time-efficient processing</li>
                                    <li>✓ User-friendly interface</li>
                                    <li>✓ Comprehensive analysis</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Home;











// import { Container, Carousel, Row, Col, Card } from 'react-bootstrap';
// import '../Styles/Home.css';
//
// const Home = () => {
//     return (
//         <>
//             <Container className="my-5">
//                 <Row className="justify-content-center">
//                     <Col md="8">
//                         <Carousel>
//                             <Carousel.Item>
//                                 <img
//                                     className="d-block w-100"
//                                     src="public/fem_simulation1.jpg"
//                                     alt="First slide"
//                                 />
//                                 <Carousel.Caption>
//                                     <h3 style={{ color: 'blanchedalmond' }}>Welcome to PyAnsys</h3>
//                                     <p style={{ color: 'darkgray' }}>PyAnsys is a powerful tool for simulation and analysis.</p>
//                                 </Carousel.Caption>
//                             </Carousel.Item>
//                             <Carousel.Item>
//                                 <img
//                                     className="d-block w-100"
//                                     src="public/fem_simulation2.png"
//                                     alt="Second slide"
//                                 />
//                                 <Carousel.Caption>
//                                     <h3 style={{ color: 'blanchedalmond' }}>Advanced Features</h3>
//                                     <p style={{ color: 'darkgray' }}>Explore the advanced features of PyAnsys for your projects.</p>
//                                 </Carousel.Caption>
//                             </Carousel.Item>
//                             <Carousel.Item>
//                                 <img
//                                     className="d-block w-100"
//                                     src="public/fem_simulation3.png"
//                                     alt="Third slide"
//                                 />
//                                 <Carousel.Caption>
//                                     <h3 style={{ color: 'blanchedalmond'}}>Get Started</h3>
//                                     <p style={{ color: 'darkgray' }}>Learn how to get started with PyAnsys today.</p>
//                                 </Carousel.Caption>
//                             </Carousel.Item>
//                         </Carousel>
//                     </Col>
//                 </Row>
//                 <Row className="mt-5">
//                     <Col md="4">
//                         <Card>
//                             <Card.Body>
//                                 <Card.Title>Feature 1</Card.Title>
//                                 <Card.Text>
//                                     PyAnsys offers a wide range of features to help you with your simulations.
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                     <Col md="4">
//                         <Card>
//                             <Card.Body>
//                                 <Card.Title>Feature 2</Card.Title>
//                                 <Card.Text>
//                                     With PyAnsys, you can easily integrate with other tools and platforms.
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                     <Col md="4">
//                         <Card>
//                             <Card.Body>
//                                 <Card.Title>Feature 3</Card.Title>
//                                 <Card.Text>
//                                     PyAnsys provides detailed documentation and support to help you succeed.
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     );
// };
//
// export default Home;