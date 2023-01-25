import React, { HTMLAttributes, PropsWithChildren } from 'react';
// import Footer from '../Footer/Footer';
// import Header from '../Header/Header';
import Container from '@mui/material/Container';
import styles from './MainLayout.module.scss';
import Header from '../Header/Header';

interface MainLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = (props) => {
  return (
    <div className={props.className}>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <Container maxWidth="lg">{props.children}</Container>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default MainLayout;
