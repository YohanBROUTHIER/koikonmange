import Header from './partials/header';
import Footer from './partials/footer';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}