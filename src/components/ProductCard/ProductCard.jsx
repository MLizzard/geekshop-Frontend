import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, apiUrl }) => {
    const navigate = useNavigate();

    const handleClick = () => {
         navigate(`/products/${product.id}`); // Переход на страницу товара
    };
    return (
        <div 
            className="product-card"
            onClick={handleClick}
            style={{ cursor: 'pointer' }}>
            <div className="image-container">
                <img
                    src={`${apiUrl}/products/${product.id}/image`}
                    alt={`Изображение ${product.name}`}
                    className="productCard-image"
                    onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                    }}
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
    );
};

export default ProductCard;