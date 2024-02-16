import { faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useState } from 'react';
import { LoginFields } from 'screens/components/global/fields';
import '../../contents/styles/contents.css';
import '../../components/styles/components.css';
import { MD5, enc } from 'crypto-js';
import firebase, { initializeApp } from 'firebase/app';
import { getStorage } from "@firebase/storage";
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore , getDocs, collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


type Props = {
    onAddHeadOfFamily: (value: boolean) => void;
  };

export default function SendSMS({onAddHeadOfFamily}: Props) {

    const firebaseConfig = {
        apiKey: "AIzaSyCKb1B3-_VHWMtSMbkMVjek1bDlmzIDQLA",
        authDomain: "mdrrmc-bdrrmc.firebaseapp.com",
        projectId: "mdrrmc-bdrrmc",
        storageBucket: "mdrrmc-bdrrmc.appspot.com",
        messagingSenderId: "1010058942404",
        appId: "1:1010058942404:web:15461fb754958c39d97691",
        measurementId: "G-TZPWSQ2FKV"
      };
        
      const app = initializeApp(firebaseConfig);
      const auth = getAuth();
      const storage = getStorage();
      const db = getFirestore()


  const [form, setForm] = React.useState({ subject: '', message: '' });
  const resetForm = (setForm: React.Dispatch<React.SetStateAction<{ subject: string; message: string }>>) => {
    setForm({ subject: '', message: '' });
  };
  const memoizedResetForm = useCallback(() => resetForm(setForm), [setForm]);

  const getCurrentDay = () => {
    const currentHour = new Date().getHours();
    let greetingMessage = '';

    if (currentHour >= 0 && currentHour < 12) {
      greetingMessage = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      greetingMessage = 'Good Afternoon';
    } else if (currentHour >= 17 && currentHour < 23) {
      greetingMessage = 'Good Evening';
    }
    return greetingMessage;
  };

  const handleSubmit = async () => {
    try {
      const chatCollection = collection(db, 'sms');
      const newChat = {
        subject: form.subject,
        message: form.message,
        uuid: uuidv4()
        // Add any other fields you want to store in the Firestore document
      };
  
      const docRef = await addDoc(chatCollection, newChat);
  
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    onAddHeadOfFamily(false)
    memoizedResetForm();
    // sendSms();
 
  };

  const sendSms = async () => {
    const result = getCurrentDay();
    const apiKey = "g3p3m8ht";
    const appId = "lpoIXtmD";
    const apiPwd = "lc71fV4F";
    const url = 'https://api.onbuka.com/v3/sendSms';
    const timestamp = Math.floor(Date.now() / 1000);
    const sign = MD5(apiKey + apiPwd + timestamp.toString()).toString(enc.Hex);
    const number = "639065920972";

    const payload = {
      content: form.message,
      numbers: number,
      appId: appId,
      senderId: "Alumni Tracking"
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

      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData", responseData);
      } else {
        console.error("Failed to send SMS");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='form-container'>
      <h1>Compose Message</h1>
      <LoginFields
        title='Subject'
        type='subject'
        icon={faLock}
        disabled={false}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        placeholder='Subject'
        value={form.subject}
      />
      <LoginFields
        title='Message'
        type='message'
        icon={faLock}
        disabled={false}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder='Message'
        value={form.message}
      />
       <button onClick={handleSubmit}>Send Request</button>
    </div>
  );
}
