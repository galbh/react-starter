import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './home.page.scss';

const HomePage = () => {
  const [t] = useTranslation();
  return (
    <div className={styles.homePage}>
      {t('HOME_PAGE')}
    </div>
  );
};

export default HomePage;
