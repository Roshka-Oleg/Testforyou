import { useState, useCallback } from 'react';

/**
 * Fallback категории на случай недоступности API
 * Используются, если запрос к dummyjson.com не проходит
 */
const FALLBACK_CATEGORIES = [
  'Beauty',
  'Fragrances',
  'Furniture',
  'Groceries',
  'Home Decoration',
  'Kitchen Accessories',
  'Laptops',
  'Mens Shirts',
  'Mens Shoes',
  'Mens Watches',
  'Mobile Accessories',
  'Motorcycle',
  'Skin Care',
  'Smartphones',
  'Sports Accessories',
  'Sunglasses',
  'Tablets',
  'Tops',
  'Vehicle',
  'Womens Bags',
  'Womens Dresses',
  'Womens Jewellery',
  'Womens Shoes',
  'Womens Watches'
];

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
   * При недоступности API используются fallback данные
   */
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Добавляем timeout для запроса
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд timeout
      
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