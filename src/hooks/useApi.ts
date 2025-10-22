import { useState, useCallback } from 'react';


const FALLBACK_CATEGORIES = [
  'IT и разработка',
  'Финансы и банки',
  'Образование',
  'Медицина',
  'Торговля',
  'Производство',
  'Строительство',
  'Транспорт и логистика',
  'Госслужба',
  'Другое'
];


export const useApi = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); 
      
      const response = await fetch('https://dummyjson.com/products/categories', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // API возвращает массив объектов с полями: slug, name, url
      // Извлекаем поле name для отображения
      const categoryNames = data.map((item: { slug: string; name: string; url: string }) => item.name);
      console.log('✅ Категории загружены из API:', categoryNames.length, 'шт.');
      console.log('Первые 3 категории:', categoryNames.slice(0, 3));
      setCategories(categoryNames);
    } catch (err) {
      // При ошибке используем fallback категории
      console.warn('⚠️ API недоступен, используем fallback категории');
      console.log('✅ Загружено', FALLBACK_CATEGORIES.length, 'fallback категорий');
      setCategories(FALLBACK_CATEGORIES);
      setError('API недоступен. Используются локальные данные.');
    } finally {
      setLoading(false);
    }
  }, []); // Пустой массив зависимостей - функция создается один раз

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
