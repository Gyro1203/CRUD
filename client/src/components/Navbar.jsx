import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div>
        <h1>React MySQL</h1>

        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/list">Productos</Link>
            </li>
            <li>
                <Link to="/form">Agregar Producto</Link>
            </li>
        </ul>
    </div>
  )
}

export default NavBar