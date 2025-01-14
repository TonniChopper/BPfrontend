import { useState } from 'react';
import FetchSimulation from '../Components/FetchSimulation';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const SimulationPage = () => {
    const [formData, setFormData] = useState({ temperature: '', pressure: '' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFetchSimulation = async () => {
        setLoading(true);
        const simulationResult = await FetchSimulation(formData);
        setResult(simulationResult);
        setLoading(false);
    };

    return (
        <>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md="6">
                        <Form>
                            <Form.Group controlId="formTemperature">
                                <Form.Label>Temperature</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPressure" className="mt-3">
                                <Form.Label>Pressure</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pressure"
                                    value={formData.pressure}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleFetchSimulation} disabled={loading} className="mt-3">
                                {loading ? "Loading..." : "Solve"}
                            </Button>
                        </Form>
                        {result && (
                            <div className="mt-5 text-center">
                                <h3>{result.title}</h3>
                                <img src={result.image} alt="Result"/>
                                <pre>{JSON.stringify(result.data, null, 2)}</pre>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SimulationPage;