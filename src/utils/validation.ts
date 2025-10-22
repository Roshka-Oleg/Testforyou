import { FormData } from '../types/types';
export const validatePersonalData = (data: FormData['personal']) => {
  const errors: { [key: string]: string } = {};
  
  // Валидация российского номера телефона
  if (!data.phone.trim()) {
    errors.phone = 'Телефон обязателен для заполнения';
  } else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(data.phone)) {
    errors.phone = 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX';
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

// Форматирование российского номера телефона: +7 (XXX) XXX-XX-XX
export const formatPhone = (value: string): string => {
  // Убираем все нечисловые символы
  const numbers = value.replace(/\D/g, '');
  
  // Если номер начинается с 8, заменяем на 7
  let cleanNumbers = numbers;
  if (numbers.startsWith('8')) {
    cleanNumbers = '7' + numbers.substring(1);
  } else if (!numbers.startsWith('7') && numbers.length > 0) {
    cleanNumbers = '7' + numbers;
  }
  
  // Форматируем: +7 (XXX) XXX-XX-XX
  let formatted = '+7';
  
  if (cleanNumbers.length > 1) {
    formatted += ' (' + cleanNumbers.substring(1, 4);
  }
  if (cleanNumbers.length >= 4) {
    formatted += ')';
  }
  if (cleanNumbers.length > 4) {
    formatted += ' ' + cleanNumbers.substring(4, 7);
  }
  if (cleanNumbers.length > 7) {
    formatted += '-' + cleanNumbers.substring(7, 9);
  }
  if (cleanNumbers.length > 9) {
    formatted += '-' + cleanNumbers.substring(9, 11);
  }
  
  return formatted;
};