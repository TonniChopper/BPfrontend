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
                                    src="public/fem_simulation1.jpg"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 style={{ color: 'blanchedalmond' }}>Welcome to PyAnsys</h3>
                                    <p style={{ color: 'darkgray' }}>PyAnsys is a powerful tool for simulation and analysis.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="public/fem_simulation2.png"
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h3 style={{ color: 'blanchedalmond' }}>Advanced Features</h3>
                                    <p style={{ color: 'darkgray' }}>Explore the advanced features of PyAnsys for your projects.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="public/fem_simulation3.png"
                                    alt="Third slide"
                                />
                                <Carousel.Caption>
                                    <h3 style={{ color: 'blanchedalmond'}}>Get Started</h3>
                                    <p style={{ color: 'darkgray' }}>Learn how to get started with PyAnsys today.</p>
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