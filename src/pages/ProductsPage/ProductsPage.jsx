import { useEffect, useState } from 'react';
import ProductService from '../../api/productService';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductsPage.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = 'http://localhost:8080/api/v1';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await ProductService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Ошибка загрузки товаров:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="loading">Загрузка товаров...</div>;

    return (
        <div className="products-page">
            <h1 className="page-title">Товары</h1>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        apiUrl={API_URL} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;