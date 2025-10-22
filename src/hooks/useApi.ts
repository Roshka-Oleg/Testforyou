import { useState } from 'react';

// Список реальных мест работы/сфер деятельности для России
const WORKPLACE_OPTIONS = [
  'IT и разработка программного обеспечения',
  'Банковская сфера и финансы',
  'Образование и наука',
  'Медицина и здравоохранение',
  'Торговля (розничная/оптовая)',
  'Строительство',
  'Производство',
  'Транспорт и логистика',
  'Государственная служба',
  'Телекоммуникации и связь',
  'Маркетинг и реклама',
  'Юридические услуги',
  'Недвижимость',
  'Туризм и гостиничный бизнес',
  'Ресторанный бизнес',
  'Консалтинг',
  'Страхование',
  'Энергетика',
  'Сельское хозяйство',
  'Другое'
];

export const useApi = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Используем локальный список вместо внешнего API
      // Имитируем небольшую задержку для UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCategories(WORKPLACE_OPTIONS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const submitApplication = async (title: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title, 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    submitApplication,
  };
};