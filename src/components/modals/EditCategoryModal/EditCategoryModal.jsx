import { useState } from 'react';
import ProductService from '../../../api/productService';
import './EditCategoryModal.css';

const EditCategoryModal = ({ category, onClose, onSave }) => {
    const [name, setName] = useState(category.name);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const updated = await ProductService.updateCategory(category.id, { name });
            onSave(updated);
        } catch (error) {
            console.error('Ошибка обновления категории:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Редактировать категорию</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Название</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>
                            Отмена
                        </button>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategoryModal;