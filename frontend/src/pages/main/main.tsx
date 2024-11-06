import { useLocation } from 'react-router-dom';
import logoSrc from '~/assets/images/logo.svg';
import styles from './styles.module.css';
import { AppPath } from '~/common/enums/enums.js';

const Main = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <main className={styles['container']}>
      <section className={styles['auth-container']}>
        <div className={styles['left-side']}>
          <img alt="logo" className={styles['logo-wrapper']} src={logoSrc} />
        </div>
        <div className={styles['right-side']}>
          <h3 className={styles['form-title']}>
            {pathname === AppPath.SIGN_IN
              ? 'Welcome back'
              : 'Create an account'}
          </h3>
        </div>
      </section>
    </main>
  );
};

export { Main };
