import { useState, useEffect } from 'react';
import ProductService from '../../../api/productService';
import './EditProductModal.css'; // Стили возьмем из AddProductModal с небольшими изменениями

const EditProductModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        description: product.description || '',
        inStock: product.inStock,
        categoryId: product.category.id,
        image: null
    });

    const URL_API = 'http://localhost:8080/api/v1'

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(
        `${URL_API}/products/${product.id}/image`
    );

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await ProductService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to load categories', error);
            }
        };
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formDataToSend.append(key, value);
                }
            });

            const updatedProduct = await ProductService.updateProduct(
                product.id, 
                formDataToSend
            );
            onSave(updatedProduct);
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Редактировать товар</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Название</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            minLength={3}
                            maxLength={50}
                        />
                    </div>

                    <div className="form-group">
                        <label>Цена</label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Описание</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={511}
                        />
                    </div>

                    <div className="form-group">
                        <label>Категория</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={(e) => 
                                    setFormData(prev => ({ ...prev, inStock: e.target.checked }))
                                }
                            />
                            В наличии
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Изображение</label>
                        <div className="image-preview">
                            <img 
                                src={previewImage} 
                                alt="Предпросмотр" 
                                
                            />
                        </div>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="modal-actions">
                        <button 
                            type="button" 
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Отмена
                        </button>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;