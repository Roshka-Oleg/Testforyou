import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Импортируем Bootstrap CSS для стилизации
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Точка входа в приложение
 * Используем React 18 API для рендеринга
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

