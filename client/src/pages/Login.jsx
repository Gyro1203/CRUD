import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
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
      localStorage.setItem('token', token);
      const { role } = jwtDecode.default(token);
      setRole(role);
      navigate('/dashboard');
    } catch (err) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input name="username" onChange={handleChange} placeholder="Usuario" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
  );
};

Login.propTypes = {
    setRole: PropTypes.func.isRequired, 
};  

export default Login;
