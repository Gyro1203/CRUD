import PropTypes from 'prop-types';

const Dashboard = ({ role }) => {
  return (
    <div>
      <h2>Bienvenido al Dashboard</h2>
      {role === 'admin' && (
        <button>Eliminar Producto</button>
      )}
      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
      }}>Cerrar sesión</button>
    </div>
  );
};

Dashboard.propTypes = {
    role: PropTypes.string.isRequired,  // Aseguramos que 'role' es una cadena y es obligatoria
  };

export default Dashboard;