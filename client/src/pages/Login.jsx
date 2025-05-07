import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';

const Login = ({ setRole }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', form);
      const token = res.data.token;
      console.log('TOKEN:', token);
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      console.log('DECODED:', decoded);
      const { role } = decoded;
      setRole(role);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                  name="username"
                  className="form-control"
                  placeholder="Usuario"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
    setRole: PropTypes.func.isRequired, 
};  

export default Login;
