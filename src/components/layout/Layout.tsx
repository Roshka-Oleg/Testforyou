import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode; 
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-vh-100 bg-light">
      {/* Навигационная панель */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            Заявка на займ
          </span>
        </div>
      </nav>
      {/* Основное содержимое */}
      {children}
    </div>
  );
};

export default Layout;