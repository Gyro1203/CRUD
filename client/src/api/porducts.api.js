import axios from '../services/axios';

export const getProductsRequest = async() => {
    return await axios.get('http://localhost:3001/products');
}

export const getProductRequest = async(id) => {
    return await axios.get(`http://localhost:3001/products/${id}`);
}

export const createProductRequest = async(product) => {
    return await axios.post('http://localhost:3001/products', product);
}

export const deleteProductRequest = async(id) => {
    return await axios.delete(`http://localhost:3001/products/${id}`);
}

export const updateProductRequest = async(id, newFields) => {
    return await axios.put(`http://localhost:3001/products/${id}`, newFields);
}