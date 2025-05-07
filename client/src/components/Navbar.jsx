import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">React MySQL</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/form">Agregar Producto</Link>
            </li>
            <li>
                <button
                    className="btn btn-outline-danger"
                onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }}
                >
                Cerrar sesión
                </button>
            </li>
            
          </ul>
        </div>
        
      </div>
    </nav>
  );
}

export default NavBar;