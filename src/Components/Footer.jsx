import { Container, Row, Col } from 'react-bootstrap';
import '../Styles/Footer.css';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4">
            <Container>
                <Row>
                    <Col md="4">
                        <h5>About Us</h5>
                        <p>WebPyAnsys is a leading provider of simulation software solutions.</p>
                    </Col>
                    <Col md="4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#home" className="text-white">Home</a></li>
                            <li><a href="#simulation1" className="text-white">Simulation 1</a></li>
                            <li><a href="#simulation2" className="text-white">Simulation 2</a></li>
                            <li><a href="#simulation3" className="text-white">Simulation 3</a></li>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>Email: info@webpyansys.com</li>
                            <li>Phone: +123 456 7890</li>
                            <li>Address: 123 Simulation St, Tech City</li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <p>&copy; 2023 WebPyAnsys. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;