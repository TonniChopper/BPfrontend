import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaUser, FaSignOutAlt} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("access_token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    navigate("/login");
  };

  return (
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 py-4 px-8 shadow-md flex justify-between items-center text-white">
          <Link to="/" className="text-xl font-bold hover:text-amber-500 transition">
              WebPyAnsys
          </Link>
          <div className="space-x-4">
              {token ? (
                  <>
                      <Link
                          to="/SimulationPage"
                          className="px-4 py-2 bg-amber-500 rounded hover:bg-amber-400 transition"
                      >
                            Simulations
                      </Link>
                      <Link
                          to="/ProfilePage"
                          className="px-4 py-2 bg-amber-500 rounded hover:bg-amber-400 transition flex items-center"
                      >
                          <FaUser size={20}/>
                      </Link>
                      <button
                          onClick={logout}
                          className="px-4 py-2 bg-amber-500 rounded hover:bg-amber-400 transition flex items-center"
                      >
                          <FaSignOutAlt size={20}/>
                      </button>
                  </>
              ) : (
                  <>
                      <Link
                          to="/register"
                          className="px-4 py-2 bg-amber-500 rounded hover:bg-amber-400 transition"
                      >
                          Register
                      </Link>
                      <Link
                          to="/login"
                          className="px-4 py-2 bg-amber-500 rounded hover:bg-amber-400 transition"
                      >
                          Login
                      </Link>
                  </>
              )}
          </div>
      </nav>
  );
};

export default Navbar;