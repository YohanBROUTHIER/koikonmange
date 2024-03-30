import Header from '../containers/app/partials';
import Footer from '../components/Partials/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Aside from '../components/Partials/Aside';

function App() {
  
  const {isAside} = useSelector((state) => state.isAside);

  return (
    <>
      <Header/>
      {isAside &&
          <Aside />
      }
      <Outlet />
      <Footer/>
    </>
  );
}

export default App;

