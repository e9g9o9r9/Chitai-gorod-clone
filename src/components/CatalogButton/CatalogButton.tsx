import React from 'react';
import styles from "./styles.module.scss";

interface CatalogButtonProps {
  toggleDrawer: (open: boolean) => void;
}

export const CatalogButton: React.FC<CatalogButtonProps> = ({ toggleDrawer }) => {
  const handleClick = () => toggleDrawer(true);

  return (
    <button
      className={styles.wrapper}
      onClick={handleClick}
      aria-label="Open catalog"
    >
      <span className={styles.text}>Каталог</span>
    </button>
  );
};