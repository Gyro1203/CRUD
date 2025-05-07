import { useEffect, useRef } from "react"
import { useProduct } from "../context/ProductProvider"
import ProductItem from '../components/ProductItem'

function ProductList() {

  const {products, loadProducts} = useProduct(); 
  const tableRef = useRef(null);

  useEffect(() => {
    loadProducts();
  },[loadProducts])

  useEffect(() => {
    if (products.length > 0) {
      const $ = window.$; // jQuery cargado globalmente

      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      $(tableRef.current).DataTable();
    }
  }, [products]);  

  return (
    <div>
      <h1 className="display-4 text-center">Productos</h1>
      {products.length === 0 ? (
        <h2 className="text-center">No existen productos</h2>
      ) : (
        <table ref={tableRef} className="display" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Productos</th>
              <th>Stock</th>
              <th>Descripcion</th>
              <th>Fecha de Creacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (<ProductItem product={product} key={product.id} />))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList