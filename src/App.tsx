import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, Link } from "react-router-dom";
import './App.css';
import { AuthContext } from 'auth';
import { ForgotPassword } from 'screens/partials/auth/forgotpassword';
import { children } from 'types/interfaces';
import Login from 'screens/partials/auth';
import { Header } from 'screens/components/gen/header';
import Navbarmenu from 'screens/components/gen/navigator/navbarmenu';
import Error from 'screens/partials/Error/Error';
import Account from 'screens/home/details/account';
import Logout from 'screens/partials/auth/logout';
import Statistics from 'screens/home/statistics';
import RegistrationTable from 'screens/home/registration/table';
import Registration from 'screens/home/registration';
import SMS from 'screens/home/SMS/SMS';

//**NOTE**(((((ONLY USE TSRFC WHEN CREATING NEW SCREENS)))))**NOTE**/

const App: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsIOpen] = useState(false);

  const ProtectedRoute: React.FC<children> = ({ children }) => {
    if (currentUser === null) {
      return <Navigate to="/alumni/news" />;
    }

    return children
  };

  React.useEffect(() => {
    newsLetter()
  },[])

  const newsLetter = async() => {
    console.log('this is where website ask you for newsletter')
    const saved: string = localStorage.getItem('newsletter') || '';
    console.log(saved)
    if(saved == '') {
      console.log('newsletter unsubscribed')
      setIsIOpen(true)
    } else {

      console.log('newsletter subscribed')
      return
    }
  }
  return (
    <BrowserRouter>
      {currentUser && <Header menu={Navbarmenu} />}
      <Routes>
       <Route  path="/">
          <Route path="login" element={<Login/>} />
          <Route path="forgotpassword" element={<ForgotPassword/>} />
          <Route path='*' element={<Error/>} />
          <Route index element = {<Login/>}/>
          <Route path='logout' element = {<Logout/>} />
          
        </Route>
        <Route path = "admin">
          <Route path='account' index element={ <ProtectedRoute><Account/></ProtectedRoute>}/>
          <Route path='registration' index element={ <ProtectedRoute><Registration/></ProtectedRoute>}/>
          <Route path='sms' index element={ <ProtectedRoute><SMS/></ProtectedRoute>}/>

          <Route path='statistics' index element={ <ProtectedRoute><Statistics/></ProtectedRoute>}/>
        </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
