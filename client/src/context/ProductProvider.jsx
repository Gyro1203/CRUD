import { useContext, useState } from "react";
import { getProductsRequest, getProductRequest, deleteProductRequest, createProductRequest, updateProductRequest } from "../api/porducts.api"
import { ProductContext } from "./ProductContext";
import PropTypes from "prop-types";


export const useProduct = () =>{
    const context = useContext(ProductContext);
    if(!context){
        throw new Error("useProduct must be used within a ProductContextProvider");
    }
    return context;
}

export const ProductContextProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    async function loadProducts(){
        const response = await getProductsRequest();
        setProducts(response.data);
    }

    const deleteProduct = async(id) => {
        try {
          const response = await deleteProductRequest(id);
          console.log(response);
          setProducts(products.filter(product => product.id !== id));
        } catch (error) {
          console.log(error);
        }
    };

    const createProduct = async(product) => {
        try {
            const response = await createProductRequest(product);
            console.log(response);
            } catch (error) {
                console.log(error);
            }
    }

    const getProduct = async(id) => {
        try {
            const response = await getProductRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = async(id, newFields) => {
        try {
            const response = await updateProductRequest(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    

    return <ProductContext.Provider value={{products, loadProducts, deleteProduct, createProduct, getProduct, updateProduct}}>
        {children}
    </ProductContext.Provider>
}

ProductContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };