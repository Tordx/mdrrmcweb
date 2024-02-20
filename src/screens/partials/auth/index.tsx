import { collection, getDocs, addDoc } from '@firebase/firestore';
import { auth, db } from '../../../firebase';
import React, { useContext, useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css'
import { AuthContext } from 'auth';
import { codedata, logindata } from 'types/interfaces';
import { Auth2FA, LoginFields } from 'screens/components/global/fields';
import { faLock, faUser, faUserAlt, faUserCircle, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { generateRandomKey } from '../../../firebase/function';

let md5 = require('md5')

export default function Login({}) {

  const [verification, setverification] = useState('');
  const [username, setusername] = useState('');
  const [loginpassword, setloginPassword] = useState('');
  const { currentUser } = useContext(AuthContext);
  const [toast, settoast] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false)
  const [time, setTime] =  useState(0)
  const [timer, setTimer] = useState(false)
  const [smsid, setsmsid] = useState('')
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
     navigate("/admin/statistics");
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
            contact: doc.data().contact,
            
        });
      }
    });
    const queryCode = await getDocs(collection(db, "code"));
    const codeData: codedata[] = [];
  
    queryCode.forEach((doc) => {
      if (doc.data().username === username && doc.data().id == smsid) {
        codeData.push({

            code: doc.data().code,
            id: doc.data().id,
            username: doc.data().username
            
            
        });
      }
    });
    console.log(codeData)
    if(codeData.length === 0){
      alert('Please send a verification')
      seterror(false)

      return
    }
    if(codeData[0].code != verification){
      alert('Wrong verification code')
      seterror(false)

      return
    }
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
          navigate("/admin/statistics")
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

  const sendVerification = async() => {
    if(!username){
      alert('username is blank')
    } else {
      try {
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
                contact: doc.data().contact,
                
            });
          }
        });
          if(userData.length == 0){
            alert('no account associated with your username')
            return
          }

          setTimer(true)
          setTime(25)
          const code = generateRandomKey(5)
          const id = generateRandomKey(25)
          setsmsid(id)
          sendsms(userData[0].contact, code)
          const codeCollection = collection(db, 'code');
          const codeParams = {

            id: id,
            code: code,
            username: username,
            contact: userData[0].contact
          };

        const docRef = await addDoc(codeCollection, codeParams);
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
    
  }

  const sendsms = async (contact: string, code: string) => {
    const apiKey = "g3p3m8ht";
    const appId = "lpoIXtmD";
    const apiPwd = "lc71fV4F";
    const url = 'https://api.onbuka.com/v3/sendSms';
    const timestamp = Math.floor(Date.now() / 1000);
    const sign = md5(apiKey + apiPwd + timestamp.toString());
    const number =  Number(`63${contact.substring(1)}`);
    console.log(sign);
    console.log(number);
  
    const payload = {
      content: `Hello, here is your Verification code: ${code}`,
      numbers: number,
      appId: appId,
      senderId: "MDRRMC"
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Api-Key': apiKey,
          'Sign': sign,
          'Timestamp': timestamp.toString()
        },
        body: JSON.stringify(payload)
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(timer){
  
      setTimeout(() => {
        if(time > 0){
          setTime(time - 1); 
        } else if (time === 0) {
          setTimer(false);
        }
      
      }, 1000);
    }
  }, [time]);
  

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
          <Auth2FA 
            title = 'Verification Code'
            type  ='code'
            icon = {faLock}
            value={verification}
            placeholder='Verification code'
            disabled = {false}
            onChange={(e) => setverification(e.target.value)} 
            onClick={sendVerification}
            time={time}
            timer = {timer}
          />
          <a>Forgot password?</a>
          <button onClick={checkStatus}>Login</button>
          {loading && <p style={{color: error ? 'red' : 'black', fontSize: 12, textAlign: 'center'}}>{toast}</p>}
        </div>
      </div>
    </div>
  )
}