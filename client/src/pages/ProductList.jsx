import { useEffect } from "react"
import ProductItem from '../components/ProductItem'
import { useProduct } from "../context/ProductProvider"

function ProductList() {

    const {products, loadProducts} = useProduct(); 

    useEffect(() => {
        loadProducts();
    },[loadProducts])

  function renderMain(){
    if (products.length === 0) return <h1>No existen productos</h1>
    return products.map(product => (<ProductItem product={product} key={product.id} />))

  }

  return (
    <div>
        <h1>
            Productos
        </h1>
        {renderMain()}
    </div>  
  )
}

export default ProductList