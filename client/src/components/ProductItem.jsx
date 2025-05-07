import PropTypes from 'prop-types';
import { useProduct } from '../context/ProductProvider';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {

  const { deleteProduct } = useProduct();
  const navigate = useNavigate();
  
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>{product.stock}</td>
      <td>{product.description}</td>
      <td>{new Date(product.createdAt).toLocaleDateString()}</td>
      <td>
        <button className='btn btn-primary' onClick={() => navigate(`/edit/${product.id}`)}>Editar</button>
        <button className='btn btn-danger' onClick={() => deleteProduct(product.id)}>Eliminar</button>
      </td>
    </tr>
  );
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