import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'sonner';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  try {
    await axios.post('http://localhost:8000/api/login', { email, password });
    toast.success('Login successful!');
    navigate('/');
  } catch{
    setError('Login failed. Please check your credentials.');
    toast.error('Login failed. Please check your credentials.');
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-secondary">
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <Card.Header>
          <Card.Title className="text-center">Login</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin} className="space-y-4">
            <Form.Group controlId="formEmail" className="space-y-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="space-y-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            {error && <p className="text-danger mt-3">{error}</p>}
            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
            <p className="text-center text-sm mt-3">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;