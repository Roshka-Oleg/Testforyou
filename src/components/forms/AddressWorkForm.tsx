import { useState, useEffect } from 'react';
import { FormData } from '../../types/types';
import { validateAddressWorkData } from '../../utils/validation';
import { useApi } from '../../hooks/useApi';

// Популярные города России для подсказок
const RUSSIAN_CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск',
  'Воронеж',
  'Пермь',
  'Волгоград',
  'Краснодар',
  'Саратов',
  'Тюмень',
  'Тольятти',
  'Ижевск'
];

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
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const { categories, loading, error, fetchCategories } = useApi();

  useEffect(() => {
    // Загружаем категории при монтировании компонента
    fetchCategories();
  }, [fetchCategories]); // fetchCategories стабильна благодаря useCallback

  const handleChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    
    // Генерируем подсказки для адреса на основе ввода
    if (field === 'address' && value.trim().length > 0) {
      const input = value.toLowerCase();
      const suggestions = RUSSIAN_CITIES
        .filter(city => city.toLowerCase().includes(input))
        .map(city => `г. ${city}, ул. `)
        .slice(0, 5); // Показываем максимум 5 подсказок
      setAddressSuggestions(suggestions);
    } else if (field === 'address') {
      setAddressSuggestions([]);
    }
    
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
              {/* Отображаем загруженные категории из API */}
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {/* Показываем состояние загрузки */}
            {loading && <div className="form-text">Загрузка категорий...</div>}
            {/* Показываем ошибки загрузки */}
            {error && <div className="form-text text-danger">Ошибка загрузки: {error}</div>}
            {/* Отладочная информация */}
            {!loading && !error && categories.length > 0 && (
              <div className="form-text text-success">
                ✅ Загружено {categories.length} категорий
              </div>
            )}
            {!loading && !error && categories.length === 0 && (
              <div className="form-text text-warning">
                ⚠️ Категории не загружены
              </div>
            )}
            {/* Показываем ошибки валидации */}
            {errors.workplace && <div className="invalid-feedback">{errors.workplace}</div>}
          </div>

          {/* Поле адреса с автоподстановкой */}
          <div className="mb-4">
            <label htmlFor="address" className="form-label">Адрес проживания *</label>
            <input
              type="text"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Начните вводить город..."
              list="address-suggestions"
              autoComplete="off"
            />
            {/* Подсказки для адреса */}
            {addressSuggestions.length > 0 && (
              <datalist id="address-suggestions">
                {addressSuggestions.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
            )}
            <small className="form-text text-muted">
              Например: г. Москва, ул. Ленина, д. 1, кв. 10
            </small>
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