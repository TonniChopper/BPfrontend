import { NavLink, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

const Navigation = () => {
  return (
    <nav className="bg-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">SimApp</Link>

        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="hover:text-accent transition-colors text-white">Home</NavLink>
          <NavLink to="/simulation" className="hover:text-accent transition-colors text-white">Simulation</NavLink>
          <NavLink to="/login" className="hover:text-accent transition-colors text-white">Login</NavLink>
          <NavLink to="/register" className="hover:text-accent transition-colors text-white">Register</NavLink>
        </div>
        <Button variant="ghost" className="md:hidden">
          <FaBars className="h-6 w-6 text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;