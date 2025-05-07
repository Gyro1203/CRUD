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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4 text-center">
            {params.id ? "Editar Producto" : "Agregar Producto"}
          </h2>
          <Formik
            initialValues={product}
            enableReinitialize={true}
            onSubmit={async (values, { resetForm }) => {
              if (params.id) {
                await updateProduct(params.id, values);
                navigate("/list");
              } else {
                await createProduct(values);
                resetForm(); // Limpia el formulario después de guardar
              }
            }}
          >
            {({ handleChange, handleSubmit, values, setFieldValue, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Nombre del producto"
                    onChange={handleChange}
                    value={values.title}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    placeholder="Cantidad"
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFieldValue("stock", 0);
                      }
                    }}
                    value={values.stock}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Descripción del producto"
                    onChange={handleChange}
                    value={values.description}
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default FormPage;