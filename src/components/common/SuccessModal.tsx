import { FormData } from '../../types/types';

// Пропсы для модального окна
interface SuccessModalProps {
  isOpen: boolean;           // Открыто ли модальное окно
  onClose: () => void;       // Функция закрытия
  formData: FormData;        // Данные для отображения
}

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  formData 
}: SuccessModalProps) => {
  // Если модальное окно закрыто - не рендерим ничего
  if (!isOpen) return null;

  return (
    // Затемненный фон модального окна
    <div 
      className="modal show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex={-1}
    >
      {/* Контейнер модального окна */}
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Заголовок модального окна */}
          <div className="modal-header">
            <h5 className="modal-title">Заявка одобрена!</h5>
            {/* Кнопка закрытия */}
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          {/* Тело модального окна с сообщением */}
          <div className="modal-body">
            <p>
              Поздравляем, {formData.personal.lastName} {formData.personal.firstName}. 
              Вам одобрена ${formData.loan.amount} на {formData.loan.term} дней.
            </p>
          </div>
          {/* Футер модального окна */}
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;