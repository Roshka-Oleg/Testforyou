import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PersonalDataForm from './components/forms/PersonalDataForm';
import AddressWorkForm from './components/forms/AddressWorkForm';
import LoanParamsForm from './components/forms/LoanParamsForm';
import SuccessModal from './components/common/SuccessModal';
import { useFormData } from './hooks/useFormData';
import { useApi } from './hooks/useApi';


function AppContent() {
  const navigate = useNavigate();
  const { formData, updatePersonalData, updateAddressWorkData, updateLoanData } = useFormData();
  const { submitApplication, loading } = useApi();
  const [showModal, setShowModal] = useState(false);


  const handlePersonalDataSubmit = (data: typeof formData.personal) => {
    updatePersonalData(data);
  };

  const handleAddressWorkSubmit = (data: typeof formData.addressWork) => {
    updateAddressWorkData(data);
  };

  const handleLoanDataSubmit = (data: typeof formData.loan) => {
    updateLoanData(data);
  };

 
  const handleApplicationSubmit = async () => {
    try {
      const title = `${formData.personal.firstName} ${formData.personal.lastName}`;
      
      await submitApplication(title);
      
      setShowModal(true);
    } catch (error) {
      
      console.error('Error submitting application:', error);
      setShowModal(true);
    }
  };

 
  const handleModalClose = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Routes>
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
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
        formData={formData}
      />
    </Layout>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

