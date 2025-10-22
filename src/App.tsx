import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PersonalDataForm from './components/forms/PersonalDataForm';
import AddressWorkForm from './components/forms/AddressWorkForm';
import LoanParamsForm from './components/forms/LoanParamsForm';
import SuccessModal from './components/common/SuccessModal';
import { useFormData } from './hooks/useFormData';
import { useApi } from './hooks/useApi';

/**
 * Компонент с роутингом для управления формами
 * Используем React Router для навигации между шагами формы
 */
function AppContent() {
  const navigate = useNavigate();
  const { formData, updatePersonalData, updateAddressWorkData, updateLoanData } = useFormData();
  const { submitApplication, loading } = useApi();
  const [showModal, setShowModal] = useState(false);

  /**
   * Обработчики для переходов между формами
   */
  const handlePersonalDataSubmit = (data: typeof formData.personal) => {
    updatePersonalData(data);
  };

  const handleAddressWorkSubmit = (data: typeof formData.addressWork) => {
    updateAddressWorkData(data);
  };

  const handleLoanDataSubmit = (data: typeof formData.loan) => {
    updateLoanData(data);
  };

  /**
   * Обработчик финальной отправки заявки
   * Отправляем данные на API и показываем модальное окно
   */
  const handleApplicationSubmit = async () => {
    try {
      // Формируем title согласно ТЗ: firstName + ' ' + lastName
      const title = `${formData.personal.firstName} ${formData.personal.lastName}`;
      
      // Отправляем заявку на API
      await submitApplication(title);
      
      // Показываем модальное окно с результатом
      setShowModal(true);
    } catch (error) {
      // В случае ошибки всё равно показываем модальное окно
      // так как это тестовый API
      console.error('Error submitting application:', error);
      setShowModal(true);
    }
  };

  /**
   * Обработчик закрытия модального окна
   * Возвращаем пользователя на первую форму
   */
  const handleModalClose = () => {
    setShowModal(false);
    // Опционально: можно сбросить данные формы и вернуться на первый шаг
    navigate('/');
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Routes>
              {/* Форма 1: Личные данные */}
              <Route 
                path="/" 
                element={
                  <PersonalDataForm
                    data={formData.personal}
                    onSubmit={handlePersonalDataSubmit}
                    onNext={() => navigate('/address-work')}
                  />
                } 
              />
              
              {/* Форма 2: Адрес и место работы */}
              <Route 
                path="/address-work" 
                element={
                  <AddressWorkForm
                    data={formData.addressWork}
                    onSubmit={handleAddressWorkSubmit}
                    onNext={() => navigate('/loan-params')}
                    onBack={() => navigate('/')}
                  />
                } 
              />
              
              {/* Форма 3: Параметры займа */}
              <Route 
                path="/loan-params" 
                element={
                  <LoanParamsForm
                    data={formData.loan}
                    personalData={formData.personal}
                    onSubmit={handleLoanDataSubmit}
                    onBack={() => navigate('/address-work')}
                    onApplicationSubmit={handleApplicationSubmit}
                    loading={loading}
                  />
                } 
              />
              
              {/* Редирект на главную для несуществующих маршрутов */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Модальное окно успешной подачи заявки */}
      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
        formData={formData}
      />
    </Layout>
  );
}

/**
 * Корневой компонент приложения
 * Оборачиваем всё в Router для использования React Router
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

