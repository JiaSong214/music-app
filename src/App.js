import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from "react-redux";
import { HashRouter } from 'react-router-dom';
import useAuth from './hooks/useAuth.jsx';
import Navigation from './components/navgation.jsx';
import PlayBar from './components/playBar.jsx';
import Header from './components/header.jsx';
import Modal from './components/modal.jsx';
import Router from './pages/Router.jsx';


function App() {
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);
  const [ modal, setModal ] = useState(false);
  const { checkAuth } = useAuth();

  // check authorization
  useEffect(() => {
    if(accessToken === "") checkAuth();
  }, [accessToken, checkAuth]);


  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  // active modal after rendering
  useEffect(() => {
    setTimeout(() => handleModal(), 2000)
  },[]);

  return accessToken && (
    <HashRouter>
      <Navigation/>
      <Header/>
      <PlayBar/>
      <main>
        <Router />
      </main>
      <Modal 
        isActive={modal} 
        onModal={handleModal} 
      />
    </HashRouter>
  );
}

export default App;
