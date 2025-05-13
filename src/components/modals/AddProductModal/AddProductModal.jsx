import { useState, useEffect } from 'react';
import ProductService from '../../../api/productService';
import './AddProductModal.css'

const AddProductModal = ({ onClose, onAdd }) => {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        inStock: true,
        categoryId: '',
        image: null
    });

        useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await ProductService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to load categories', error);
            } finally {
                setLoadingCategories(false);
            }
        };
        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const newProduct = await ProductService.createProduct(formDataToSend);
            onAdd(newProduct);
            onClose();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Добавить новый товар</h2>
                <form onSubmit={handleSubmit}>
                    {/* Поля формы */}
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Название"
                        required
                        minLength={3}
                        maxLength={50}
                    />
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Цена"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Описание"
                        maxLength={511}
                    />
                    <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    disabled={loadingCategories}
                    >
                    <option value="">{loadingCategories ? 'Загрузка...' : 'Выберите категорию'}</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                            />
                            В наличии
                        </label>
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Отмена</button>
                        <button type="submit">Добавить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;