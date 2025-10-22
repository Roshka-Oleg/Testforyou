import { useState } from 'react';
import { FormData } from '../../types/types';
import { validatePersonalData, formatPhone } from '../../utils/validation';

interface PersonalDataFormProps {
  data: FormData['personal'];
  onSubmit: (data: FormData['personal']) => void; 
  onNext: () => void;
}

const PersonalDataForm = ({ 
  data,
  onSubmit,
  onNext
}: PersonalDataFormProps) => {

  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (field: string, value: string) => {
    let formattedValue = value;
    if (field === 'phone') {
      formattedValue = formatPhone(value);
    }
    const updatedData = { ...formData, [field]: formattedValue };
    setFormData(updatedData);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    const validationErrors = validatePersonalData(formData);
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
        <h2 className="card-title mb-4">Личные данные</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Поле телефона */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Телефон *</label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="0XXX XXX XXX"
              maxLength={12}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          {/* Поле имени */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Имя *</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>

          {/* Поле фамилии */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Фамилия *</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>

          {/* Выбор пола */}
          <div className="mb-4">
            <label htmlFor="gender" className="form-label">Пол *</label>
            <select
              className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
              id="gender"
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value="">Выберите пол</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>

          {/* Кнопка отправки */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Далее</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDataForm;