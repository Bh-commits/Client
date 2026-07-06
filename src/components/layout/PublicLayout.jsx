import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';

export function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingActions />
    </>
  );
}







