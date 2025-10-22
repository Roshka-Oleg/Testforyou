import { useState, useCallback } from 'react';

/**
 * Кастомный хук для работы с API
 * Используется для загрузки категорий мест работы и отправки заявки
 */
export const useApi = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Загрузка категорий из API (согласно ТЗ)
   * API: https://dummyjson.com/products/categories
   * Результат кэшируется в состоянии для переиспользования
   */
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://dummyjson.com/products/categories');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // API возвращает массив объектов с полями: slug, name, url
      // Извлекаем поле name для отображения
      const categoryNames = data.map((item: { slug: string; name: string; url: string }) => item.name);
      setCategories(categoryNames);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
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