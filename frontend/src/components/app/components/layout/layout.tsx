import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '~/components/header/header';

const Layout: React.FC = () => (
  <>
    <Header />
    <>
      <Outlet />
    </>
    {/* <Footer /> */}
  </>
);

export default Layout;
