import { useState } from 'react';
import { FormData } from '../../types/types';
import { validateLoanData } from '../../utils/validation';

// Пропсы для компонента формы
interface LoanParamsFormProps {
  data: FormData['loan'];
  personalData: FormData['personal']; // Нужны для отправки заявки
  onSubmit: (data: FormData['loan']) => void;
  onBack: () => void;
  onApplicationSubmit: () => void;
  loading?: boolean;
}

const LoanParamsForm = ({
  data,
  onSubmit,
  onBack,
  onApplicationSubmit,
  loading = false,
}: LoanParamsFormProps) => {
  // Локальное состояние формы
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Обработчик изменения суммы займа
  const handleAmountChange = (value: number) => {
    const updatedData = { ...formData, amount: value };
    setFormData(updatedData);
    
    // Очищаем ошибку
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  // Обработчик изменения срока займа
  const handleTermChange = (value: number) => {
    const updatedData = { ...formData, term: value };
    setFormData(updatedData);
    
    // Очищаем ошибку
    if (errors.term) {
      setErrors(prev => ({ ...prev, term: '' }));
    }
  };

  // Обработчик отправки заявки
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидируем данные
    const validationErrors = validateLoanData(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      // Сохраняем данные и отправляем заявку
      onSubmit(formData);
      onApplicationSubmit();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Параметры займа</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Ползунок суммы займа */}
          <div className="mb-4">
            <label htmlFor="amount" className="form-label">
              Сумма займа: ${formData.amount}
            </label>
            <input
              type="range"
              className={`form-range ${errors.amount ? 'is-invalid' : ''}`}
              id="amount"
              min="200"
              max="1000"
              step="100"
              value={formData.amount}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
            />
            {/* Подписи минимального и максимального значения */}
            <div className="d-flex justify-content-between">
              <small>$200</small>
              <small>$1000</small>
            </div>
            {/* Ошибка валидации */}
            {errors.amount && <div className="invalid-feedback d-block">{errors.amount}</div>}
          </div>

          {/* Ползунок срока займа */}
          <div className="mb-4">
            <label htmlFor="term" className="form-label">
              Срок займа: {formData.term} дней
            </label>
            <input
              type="range"
              className={`form-range ${errors.term ? 'is-invalid' : ''}`}
              id="term"
              min="10"
              max="30"
              step="1"
              value={formData.term}
              onChange={(e) => handleTermChange(Number(e.target.value))}
            />
            <div className="d-flex justify-content-between">
              <small>10 дней</small>
              <small>30 дней</small>
            </div>
            {errors.term && <div className="invalid-feedback d-block">{errors.term}</div>}
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
              className="btn btn-success"
              disabled={loading}
            >
              {/* Меняем текст кнопки при загрузке */}
              {loading ? 'Отправка...' : 'Подать заявку'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanParamsForm;