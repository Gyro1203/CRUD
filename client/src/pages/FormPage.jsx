import {Form, Formik} from 'formik'
import { useProduct } from '../context/ProductProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function FormPage() {

  const { createProduct, getProduct, updateProduct } = useProduct();
  const [product, setProducts] = useState({
    title: "",
    stock: 0,
    description:""
  })
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setProducts({
          title: product.title,
          stock: product.stock,
          description: product.description
        });
      }
    }
    loadProduct();
  },[getProduct, params.id]);

  return (
    <div>

      <h1>{
        params.id ? "Editar Producto" : "Agregar Producto"
      }</h1>
      <Formik
        initialValues={product}
        enableReinitialize={true}
        onSubmit={async(values)=>{
          console.log(values);
          if (params.id) {
            await updateProduct(params.id, values);
            navigate("/list");
          }else{
            await createProduct(values);
          }
          setProducts({
            title: "",
            stock: 0,
            description:""
          });
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue, isSubmitting })=>(
        <Form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input 
            type='text' 
            name='title' 
            placeholder='Nombre del producto'
            onChange={handleChange}
            value={values.title}
          />

          <label>Stock</label>
          <input 
            type='number' 
            name='stock' 
            placeholder='Cantidad'
            onChange={handleChange}
            onBlur={(e)=>{
              if (e.target.value === "") {
                setFieldValue("stock", 0);
              }
            }}
            value={values.stock}
          />
          
          <label>Descripción</label>
          <textarea
            name="description"
            rows="3"
            placeholder='Descripcion del producto'
            onChange={handleChange}
            value={values.description}
          ></textarea>

          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? "Guardando" : "Guardar"}
          </button>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormPage