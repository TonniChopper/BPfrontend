import { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8000/api/register', formData);
            console.log('Registration successful:', response.data);
        } catch {
            setError('Registration failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md="6">
                    <h2>Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword" className="mt-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        {error && <p className="text-danger mt-3">{error}</p>}
                        <Button variant="primary" type="submit" disabled={loading} className="mt-3">
                            {loading ? "Loading..." : "Register"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;