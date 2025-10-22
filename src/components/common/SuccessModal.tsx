import { FormData } from '../../types/types';

interface SuccessModalProps {
  isOpen: boolean;           
  onClose: () => void;      
  formData: FormData;       
}

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  formData 
}: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Заявка одобрена!</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Поздравляем, {formData.personal.lastName} {formData.personal.firstName}. 
              Вам одобрена ${formData.loan.amount} на {formData.loan.term} дней.
            </p>
          </div>
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
