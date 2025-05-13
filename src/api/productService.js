import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const ProductService = {
    async getProducts() {
        try {
            const response = await axios.get(`${API_URL}/products`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },
    async getProductById(id) {
        try{
            const response = await axios.get(`${API_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            return [];
        }
       
    },
    async createProduct(formData) {
    try {
        const response = await axios.post(`${API_URL}/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
    },
    async getCategories() {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
    },
    async updateProduct(id, formData) {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
    },
    async deleteProduct(id) {
    try {
        await axios.delete(`${API_URL}/products/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}
};

export default ProductService;