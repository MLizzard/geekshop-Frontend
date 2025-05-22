import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductService from '../../api/productService';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = 'https://geekshop-v1.onrender.com/api/v1';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Ошибка загрузки товара:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!product) return <div>Товар не найден</div>;
  console.log(product);
  return (
    <div className="product-page">
      <div className="product-header">
        <h1 className="product-title">{product.name}</h1>
        <span className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
          {product.inStock ? 'Есть в наличии' : 'Нет в наличии'}
        </span>
      </div>

      <div className="product-main">
        <div className="product-image-container">
          <img
            className="product-image"
            src={`${API_URL}/products/${product.id}/image`}
            alt={product.name}
          />
        </div>

        <div className="product-info">
          <p className="product-category">Категория: {product.category.name}</p>
          <p className="product-price">{product.price.toFixed(2)} USD</p>
        </div>
      </div>

      <div className="product-description-block">
        <h2>Описание</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
