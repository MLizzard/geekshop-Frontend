import { useState } from 'react';
import ProductService from '../../../api/productService';
import './AddCategoryModal.css'; // Используем те же стили

const AddCategoryModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            onSave({name});
        } catch (error) {
            console.error('Ошибка создания категории:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Добавить категорию</h2>
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
                            {isLoading ? 'Создание...' : 'Создать'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryModal;