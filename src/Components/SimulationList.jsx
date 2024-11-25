import { Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const simulations = [
    { id: 1, title: 'Simulation 1' },
    { id: 2, title: 'Simulation 2' },
    { id: 3, title: 'Simulation 3' },
];

const SimulationList = ({ onSelect }) => {
    return (
        <Row className="justify-content-center">
            {simulations.map(simulation => (
                <Col md="4" key={simulation.id}>
                    <Card onClick={() => onSelect(simulation.id)} className="mb-4">
                        <Card.Body>
                            <Card.Title>{simulation.title}</Card.Title>
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