import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../../api/productService';
import ProductCard from '../../components/ProductCard/ProductCard';
import AddProductModal from '../../components/modals/AddProductModal/AddProductModal'
import EditProductModal from '../../components/modals/EditProductModal/EditProductModal';
import './ProductsPage.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]); // Состояние для хранения категорий
    const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории
    const API_URL = 'http://localhost:8080/api/v1';

    const handleAddProduct = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleSaveProduct = (updatedProduct) => {
        setProducts(prev => prev.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
        ));
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await ProductService.deleteProduct(productId);
            setProducts(prev => prev.filter(p => p.id !== productId));
        } catch (error) {
            console.error('Ошибка удаления товара:', error);
        }
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = selectedCategory
                    ? await ProductService.getProductsByCategory(selectedCategory)
                    : await ProductService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Ошибка загрузки товаров:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await ProductService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Ошибка загрузки категорий:', error);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div className="loading">Загрузка товаров...</div>;

    return (
        
            <div className="products-page">
                <div className="products-filter">
                    <h2>Фильтр по категории</h2>
                    <ul>
                        <li
                            key="all"
                            className={selectedCategory === null ? 'active' : ''}
                            onClick={() => handleCategoryChange(null)}
                        >
                            Все категории
                        </li>
                        {categories.map(category => (
                            <li
                                key={category.id}
                                className={selectedCategory === category.id ? 'active' : ''}
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="products-content">
                    <div className="page-header">
                        <h1 className="page-title">Товары</h1>
                        <button
                            className="add-product-button"
                            onClick={() => setShowModal(true)}
                        >
                            + Добавить товар
                        </button>
                    </div>

                    {showModal && (
                        <AddProductModal
                            onClose={() => setShowModal(false)}
                            onAdd={handleAddProduct}
                        />
                    )}

                    {editingProduct && (
                        <EditProductModal
                            product={editingProduct}
                            onClose={() => setEditingProduct(null)}
                            onSave={handleSaveProduct}
                        />
                    )}


                    <div className="product-grid">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                apiUrl={API_URL}
                                onEdit={handleEditProduct}
                                onDelete={handleDeleteProduct}
                            />
                        ))}
                    </div>
                </div>
            </div>
        
    );
};

export default ProductsPage;