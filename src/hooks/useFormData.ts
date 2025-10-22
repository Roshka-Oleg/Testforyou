import { useState } from 'react';
import { FormData } from '../types/types';

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    personal: {
      phone: '',
      firstName: '',
      lastName: '',
      gender: '',
    },
    addressWork: {
      workplace: '',
      address: '',
    },
    loan: {
      amount: 200,
      term: 10,
    },
  });
  const updatePersonalData = (data: FormData['personal']) => {
    setFormData(prev => ({
      ...prev,
      personal: data,
    }));
  };
  const updateAddressWorkData = (data: FormData['addressWork']) => {
    setFormData(prev => ({
      ...prev,
      addressWork: data,
    }));
  };
  const updateLoanData = (data: FormData['loan']) => {
    setFormData(prev => ({
      ...prev,
      loan: data,
    }));
  };
  return {
    formData,
    updatePersonalData,
    updateAddressWorkData,
    updateLoanData,
  };
};