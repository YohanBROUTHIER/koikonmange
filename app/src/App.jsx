import './styles/App.css';
import './styles/reset.css'
import Header from './components/Layout/Partials/Header';
import Footer from './components/Layout/Partials/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Aside from './components/Layout/Partials/Aside';



function App() {
  
  const {isAside} = useSelector((state) => state.isAside)

  return (
    <>
        <Header/>
        {isAside &&
          <Aside />
        }
        <Outlet />
        <Footer/>
    </>
  )
}

export default App;

