import { useState, useEffect } from 'react';
import { FormData } from '../../types/types';
import { validateAddressWorkData } from '../../utils/validation';
import { useApi } from '../../hooks/useApi';

interface AddressWorkFormProps {
  data: FormData['addressWork'];
  onSubmit: (data: FormData['addressWork']) => void;
  onNext: () => void;
  onBack: () => void;
}

const AddressWorkForm = ({
  data,
  onSubmit,
  onNext,
  onBack,
}: AddressWorkFormProps) => {

  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { categories, loading, error, fetchCategories } = useApi();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const validationErrors = validateAddressWorkData(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      onNext();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Адрес и место работы</h2>

        <form onSubmit={handleSubmit}>
          {/* Выбор места работы */}
          <div className="mb-3">
            <label htmlFor="workplace" className="form-label">Место работы *</label>
            <select
              className={`form-select ${errors.workplace ? 'is-invalid' : ''}`}
              id="workplace"
              value={formData.workplace}
              onChange={(e) => handleChange('workplace', e.target.value)}
              disabled={loading}
            >
              <option value="">Выберите место работы</option>
              {/* Отображаем загруженные категории */}
              {categories.map((category) => (
                <option key={category} value={category}>
                  {/* Форматируем название категории (первая буква заглавная) */}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {/* Показываем состояние загрузки */}
            {loading && <div className="form-text">Загрузка категорий...</div>}
            {/* Показываем ошибки загрузки */}
            {error && <div className="form-text text-danger">Ошибка загрузки: {error}</div>}
            {/* Показываем ошибки валидации */}
            {errors.workplace && <div className="invalid-feedback">{errors.workplace}</div>}
          </div>

          {/* Поле адреса */}
          <div className="mb-4">
            <label htmlFor="address" className="form-label">Адрес проживания *</label>
            <input
              type="text"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          {/* Кнопки навигации */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-between">
            <button 
              type="button" 
              className="btn btn-secondary me-md-2"
              onClick={onBack}
            >
              Назад
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading} // Блокируем при загрузке
            >
              Далее
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressWorkForm;