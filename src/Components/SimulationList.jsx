import { Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';


const simulations = [
    { id: 1, title: "Basic Simulation", description: "Simple simulation with basic parameters" },
    { id: 2, title: "Advanced Simulation", description: "Complex simulation with detailed results" },
    { id: 3, title: "Expert Simulation", description: "Professional-grade simulation engine" },
];

const SimulationList = ({ onSelect}) => {
    return (
        <Row className="justify-content-center">
            {simulations.map(simulation => (
                <Col md="4" key={simulation.id}>
                    <Card onClick={() => onSelect(simulation.id)} className={`cursor-pointer transition-all hover:shadow-lg`}>
                        <Card.Body>
                            <Card.Header>
                                <Card.Title>{simulation.title}</Card.Title>
                            </Card.Header>
                            <Card.Text>
                                <p className="text-gray-600">{simulation.description}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};
SimulationList.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default SimulationList;