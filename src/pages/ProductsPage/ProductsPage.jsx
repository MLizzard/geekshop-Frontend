import { useEffect, useState } from 'react';
import ProductService from '../../api/productService';
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
                    <div key={product.id} className="product-card">
                        <div className="image-container">
                            <img
                                src={`${API_URL}/products/${product.id}/image`}
                                alt={product.name}
                                className="product-image"
                            />
                        </div>
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">{product.price.toFixed(2)} $</p>
                            {!product.inStock && (
                                <p className="out-of-stock">Нет в наличии</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
