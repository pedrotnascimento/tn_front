import { useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Dashboard } from './components/dashboard_components/Dashboard';


function App() {
  const token = localStorage.getItem("token");
  const [isLogged, setLogged] = useState(!!token);
  const onLoggedInHandle: () => void = () => setLogged(true);
  const onLogoutHandle: () => void = () => setLogged(false);
  const loggedComponents = <>
    <Logout onLogout={onLogoutHandle} />
    <Dashboard></Dashboard>
  </>;
  return (
    <div className="App">
      {isLogged ? loggedComponents : <Login onLogged={onLoggedInHandle} />}
    </div>
  );
}

export default App;
