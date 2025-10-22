import { useState } from 'react';
import { FormData } from '../../types/types';
import { validateLoanData } from '../../utils/validation';

// Пропсы для компонента формы
interface LoanParamsFormProps {
  data: FormData['loan'];
  personalData: FormData['personal']; 
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
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAmountChange = (value: number) => {
    const updatedData = { ...formData, amount: value };
    setFormData(updatedData);
    
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  const handleTermChange = (value: number) => {
    const updatedData = { ...formData, term: value };
    setFormData(updatedData);
    
    if (errors.term) {
      setErrors(prev => ({ ...prev, term: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateLoanData(formData);
    
    if (Object.keys(validationErrors).length === 0) {
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
            <div className="d-flex justify-content-between">
              <small>$200</small>
              <small>$1000</small>
            </div>
            {errors.amount && <div className="invalid-feedback d-block">{errors.amount}</div>}
          </div>

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
              {loading ? 'Отправка...' : 'Подать заявку'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanParamsForm;
