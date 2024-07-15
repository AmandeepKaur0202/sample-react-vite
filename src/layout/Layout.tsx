// Layout.tsx
import React,{ ReactNode } from 'react';
import LanguageSwitcher from '../components/common/LanguageSwitcher';

interface LayoutProps {
    children: ReactNode; // ReactNode type includes JSX elements
  }
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>My App</h1>
        <LanguageSwitcher />
      </header>
      <main>{children}</main>
      <footer>Footer content</footer>
    </div>
  );
};

export default Layout;
