import { Container, Carousel, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
    return (
        <>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md="8">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://via.placeholder.com/800x400"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>Welcome to PyAnsys</h3>
                                    <p>PyAnsys is a powerful tool for simulation and analysis.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://via.placeholder.com/800x400"
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h3>Advanced Features</h3>
                                    <p>Explore the advanced features of PyAnsys for your projects.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://via.placeholder.com/800x400"
                                    alt="Third slide"
                                />
                                <Carousel.Caption>
                                    <h3>Get Started</h3>
                                    <p>Learn how to get started with PyAnsys today.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md="4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Feature 1</Card.Title>
                                <Card.Text>
                                    PyAnsys offers a wide range of features to help you with your simulations.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Feature 2</Card.Title>
                                <Card.Text>
                                    With PyAnsys, you can easily integrate with other tools and platforms.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Feature 3</Card.Title>
                                <Card.Text>
                                    PyAnsys provides detailed documentation and support to help you succeed.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;