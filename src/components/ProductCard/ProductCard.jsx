import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, apiUrl, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
         navigate(`/products/${product.id}`); // Переход на страницу товара
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); // Предотвращаем всплытие события
        onEdit(product);
    };

    const handleDeleteClick = async (e) => {
        e.stopPropagation();
        if (window.confirm(`Удалить товар "${product.name}"?`)) {
            try {
                await onDelete?.(product.id);
            } catch (error) {
                console.error('Ошибка удаления:', error);
            }
        }
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
            <button 
                className="edit-button"
                onClick={handleEditClick}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            </button>
            <button className="delete-button" onClick={handleDeleteClick} aria-label="Удалить">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
        </div>
    );
};

export default ProductCard;