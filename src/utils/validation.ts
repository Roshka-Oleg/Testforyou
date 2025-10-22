import { FormData } from '../types/types';
export const validatePersonalData = (data: FormData['personal']) => {
  const errors: { [key: string]: string } = {};
  if (!data.phone.trim()) {
    errors.phone = 'Телефон обязателен для заполнения';
  } else if (!/^0\d{3} \d{3} \d{3}$/.test(data.phone)) {
    errors.phone = 'Телефон должен быть в формате 0XXX XXX XXX';
  }

  if (!data.firstName.trim()) {
    errors.firstName = 'Имя обязательно для заполнения';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Фамилия обязательна для заполнения';
  }

  if (!data.gender) {
    errors.gender = 'Пол обязателен для выбора';
  }

  return errors;
};

export const validateAddressWorkData = (data: FormData['addressWork']) => {
  const errors: { [key: string]: string } = {};

  if (!data.workplace) {
    errors.workplace = 'Место работы обязательно для выбора';
  }

  if (!data.address.trim()) {
    errors.address = 'Адрес обязателен для заполнения';
  }

  return errors;
};

export const validateLoanData = (data: FormData['loan']) => {
  const errors: { [key: string]: string } = {};

  if (data.amount < 200 || data.amount > 1000) {
    errors.amount = 'Сумма займа должна быть от $200 до $1000';
  }

  if (data.term < 10 || data.term > 30) {
    errors.term = 'Срок займа должен быть от 10 до 30 дней';
  }

  return errors;
};

export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  let formatted = '';
  if (numbers.length > 0) {
    formatted = numbers.substring(0, 4); 
  }
  if (numbers.length > 4) {
    formatted += ' ' + numbers.substring(4, 7); 
  }
  if (numbers.length > 7) {
    formatted += ' ' + numbers.substring(7, 10); 
  }
  return formatted;
};