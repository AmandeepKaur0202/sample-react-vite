// LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
        <option value="en">Eng</option>
        <option value="fr">Fr</option>
      </select>
  );
};

export default LanguageSwitcher;
