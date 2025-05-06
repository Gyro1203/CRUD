import PropTypes from 'prop-types';
import { useProduct } from '../context/ProductProvider';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {

  const { deleteProduct } = useProduct();
  const navigate = useNavigate();
  
  return (
    <div>
        <h2>{product.title}</h2>
        <p>{product.stock}</p>
        <p>{product.description}</p>
        <span>{product.createdAt}</span>
        <button onClick={() => navigate(`/edit/${product.id}`)}>editar</button>
        <button onClick={() => deleteProduct(product.id)}>eliminar</button>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product