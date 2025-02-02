import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">WebPyAnsys</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/simulation" className="nav-link">Simulation</NavLink>
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;