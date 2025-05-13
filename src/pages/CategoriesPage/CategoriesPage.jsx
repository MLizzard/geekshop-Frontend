import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../../api/productService';
import EditCategoryModal from '../../components/modals/EditCategoryModal/EditCategoryModal';
import AddCategoryModal from '../../components/modals/AddCategoryModal/AddCategoryModal';
import './CategoriesPage.css';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await ProductService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Ошибка загрузки категорий:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await ProductService.deleteCategory(id);
            setCategories(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Ошибка удаления категории:', error);
        }
    };

    const handleUpdate = (updatedCategory) => {
        setCategories(prev => prev.map(c => 
            c.id === updatedCategory.id ? updatedCategory : c
        ));
        setEditingCategory(null);
    };

    const handleAdd = async (newCategory) => {
    try {
        const createdCategory = await ProductService.createCategory(newCategory);
        setCategories(prev => [...prev, createdCategory]);
        setShowAddModal(false);
    } catch (error) {
        console.error('Ошибка добавления категории:', error);
    }
};

    if (loading) return <div className="loading">Загрузка категорий...</div>;

    return (
        <div className="categories-page">
            <div className="page-header">
               <h1>Категории товаров</h1>
                <button 
                    className="add-category-btn"
                    onClick={() => setShowAddModal(true)}
               >
               Добавить категорию
                </button>
    </div>
            
            <div className="categories-list">
                {categories.map(category => (
                    <div key={category.id} className="category-card">
                        <Link 
                            to={`/products?category=${category.id}`} 
                            className="category-name"
                        >
                            {category.name}
                        </Link>
                        
                        <div className="category-actions">
                            <button 
                                className="edit-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEditingCategory(category);
                                }}
                            >
                                ✏️
                            </button>
                            <button 
                                className="delete-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (confirm(`Удалить категорию "${category.name}"?`)) {
                                        handleDelete(category.id);
                                    }
                                }}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editingCategory && (
                <EditCategoryModal
                    category={editingCategory}
                    onClose={() => setEditingCategory(null)}
                    onSave={handleUpdate}
                />
            )}

            {showAddModal && (
                <AddCategoryModal
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAdd}
                />
            )}
        </div>
    );
};

export default CategoriesPage;