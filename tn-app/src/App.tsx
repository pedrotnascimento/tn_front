import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';

import { Logout } from './components/Logout';


function App() {
  const token = localStorage.getItem("token");
  const [isLogged, setLogged] = useState(!!token);
  const onLoggedHandle: any = () => setLogged(true);
  const onLogoutHandle: any = () => setLogged(false);
  const loggedComponents = <>
  <Logout onLogout={onLogoutHandle} />
  </> 
  return (
    <div className="App">
      {isLogged ? loggedComponents : <Login onLogged={onLoggedHandle} />}
    </div>
  );
}

export default App;
