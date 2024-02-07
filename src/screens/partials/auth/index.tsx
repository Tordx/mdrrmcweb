import { collection, getDocs } from '@firebase/firestore';
import { auth, db } from '../../../firebase';
import React, { useContext, useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css'
import { AuthContext } from 'auth';
import { logindata } from 'types/interfaces';
import { LoginFields } from 'screens/components/global/fields';
import { faLock, faUser, faUserAlt, faUserCircle, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
export default function Login({}) {

  const [loginemail, setloginEmail] = useState('');
  const [username, setusername] = useState('');
  const [loginpassword, setloginPassword] = useState('');
  const { currentUser } = useContext(AuthContext);
  const [toast, settoast] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getUserData = async () => {
   try {
 
     const querySnapshot = await getDocs(collection(db, 'user'));
     querySnapshot.forEach((doc: any) => {
       // console.log(doc.id, ' => ', doc.data());
     });
   } catch (error) {
     console.log(error);
     console.log('Error getting user documents: ', error);
   }
 };
 
 getUserData();
   if(currentUser != null){
     navigate("/alumni/news");
   }
   }, [currentUser]);

   const checkStatus = async (e: any) => {
    e.preventDefault()
    seterror(false)
    setloading(true)
    settoast('checking email...')
    const querySnapshot = await getDocs(collection(db, "user"));
    const userData: logindata[] = [];
  
    querySnapshot.forEach((doc) => {
      if (doc.data().username === username) {
        userData.push({
            uid: doc.data().uid,
            username: doc.data().username,
            password: doc.data().password,
            newpassword: doc.data().newpassword,
            confirmpassword: doc.data().confirmpassword,
            type: doc.data().type,
            email: doc.data().email,
            
        });
      }
    });
    console.log(userData)
    if (userData.length > 0) {
      settoast('verifying credentials...')
      const isAdmin = userData.some((user) => user.type === "admin");
      console.log(isAdmin);
      if (isAdmin) {
        const email = userData[0].email;
        const password = loginpassword;
        settoast('logging in...')
        await signInWithEmailAndPassword(auth, email, password).then(() => {
          setloading(false)
          navigate("/alumni/news")
        }).catch((error: any) => {
          console.log(error)
          if(error == 'FirebaseError: Firebase: Error (auth/invalid-login-credentials).'){
          settoast('email and password did not matched.')
          seterror(true)
        }
        })
      } else {
        settoast('The provided email used in a non-user account')
        seterror(true)
      }
    } else {
      settoast('email provided have no account with us')
      seterror(true)
    }
  }

  return (
    <div draggable = {false} className="unauthorized-container">
      <div className='login-container-row img-bck'>
        <img width={300}  src='https://i.imgur.com/1yHrmHy.png' />
        <h1>MDRRMC</h1>
        <p>System</p>
      </div>
      <div className='login-container-row'>
        <div className='login-box'>
          <h1>Login to your Account</h1>
          <LoginFields 
            title = 'Username'
            type='text'
            icon = {faUserCircle}
            value={username}
            placeholder='username'
            disabled = {false}
            onChange={(e) => setusername(e.target.value)} 
          />
          <LoginFields 
            title = 'password'
            type  ='password'
            icon = {faLock}
            value={loginpassword}
            placeholder='password'
            disabled = {false}
            onChange={(e) => setloginPassword(e.target.value)} 
          />
          <a>Forgot password?</a>
          <button onClick={checkStatus}>Login</button>
          {loading && <p style={{color: error ? 'red' : 'black', fontSize: 12, textAlign: 'center'}}>{toast}</p>}
        </div>
      </div>
    </div>
  )
}