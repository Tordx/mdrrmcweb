import { faLock, faMessage } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useCallback } from 'react';
import { LargeTextField, LoginFields } from 'screens/components/global/fields';
import { initializeApp } from 'firebase/app';
import { getStorage } from "@firebase/storage";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { MD5, enc } from 'crypto-js';
import { generateRandomKey } from '../../../firebase/function';

type Props = {
  onAddHeadOfFamily: (value: boolean) => void;
  reloadList: (value: boolean) => void;
};

const SendSMS: React.FC<Props> = ({ onAddHeadOfFamily , reloadList }: Props) => {
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
  const db = getFirestore();

  const [form, setForm] = useState<{ subject: string; message: string }>({ subject: '', message: '' });

  const memoizedResetForm = useCallback(() => setForm({ subject: '', message: '' }), []);


  
  const handleSubmit = async () => {
    try {
      // Data validation
      if (!form.subject.trim() || !form.message.trim()) {
        alert("Subject and message cannot be empty");
        return;
      }

      const chatCollection = collection(db, 'sms');
      const newChat = {
        subject: form.subject,
        message: form.message,
        id: generateRandomKey(25)
        // Add any other fields you want to store in the Firestore document
      };

      const docRef = await addDoc(chatCollection, newChat);
      reloadList(true)
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    
    onAddHeadOfFamily(false);
    memoizedResetForm();
    // Comment or uncomment the sendSMS function to activate or deactivate
    // sendSms();
  };

  return (
    <div className='form-container'>
      <h1>Compose Message</h1>
      <LoginFields
        title='Subject'
        type='subject'
        icon={faMessage}
        disabled={false}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        placeholder='Subject'
        value={form.subject}
      />
      <LargeTextField
        title='Message'
        type='message'
        disabled={false}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder='Message'
        value={form.message}
      />
      <button onClick={handleSubmit}>Send Request</button>
    </div>
  );
};

export default SendSMS;
