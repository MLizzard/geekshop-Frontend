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
    }
};

export default ProductService;