import React, { useEffect, useState } from 'react';
import { ProductService } from '../api/ProductService';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await ProductService.getProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="products-page">
            <h1>Our Products</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <p>{product.description}</p>
                        <p>Category: {product.category.name}</p>
                        <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;