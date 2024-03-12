import { faLock, faMessage } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useCallback, useEffect } from 'react';
import { LargeTextField, LoginFields } from 'screens/components/global/fields';
import { initializeApp } from 'firebase/app';
import { getStorage } from "@firebase/storage";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc , getDocs } from 'firebase/firestore';
import { MD5, enc } from 'crypto-js';
import { fetchRegistrationList, generateRandomKey } from '../../../firebase/function';
import { registrationdata } from 'types/interfaces';

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

  const [form, setForm] = useState<{ subject: string; message: string , time: string, date: string }>({ subject: '', message: '' , time: '', date: '' });
  const [filteredContactValues, setFilteredContactValues] = useState<number[]>([]);

  const memoizedResetForm = useCallback(() => setForm({ subject: '', message: '', time: '', date: '' }), []);

  useEffect(() => {
 
    fetchData()
  }, [])
  
  const fetchData = async () => {
    try {
      const result: registrationdata[] = await fetchRegistrationList() || []
      const filteredContact: number[] = result
      .filter((item) => item.contact && item.contact.startsWith('0') && item.contact.length == 11)
      .map((item) => Number(`63${item.contact.substring(1)}`)) 
      setFilteredContactValues(filteredContact)
      console.log('Filtered Contact values:', filteredContact);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleSubmit = async () => {
    
    try {
      if (!form.subject.trim() || !form.message.trim()) {
        alert("Subject and message cannot be empty");
        return;
      }

      const chatCollection = collection(db, 'sms');
      const newChat = {
        subject: form.subject,
        message: form.message,
        date: form.date,
        time: form.time,
        isAM: isAM(),
        id: generateRandomKey(25)
      };

      const docRef = await addDoc(chatCollection, newChat);
      reloadList(true)
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    
    onAddHeadOfFamily(false);
    memoizedResetForm();
    sendsms();
  };

  const isAM = () => {
    const currentHour = parseInt(form.time.split(':')[0], 10);
    return currentHour >= 0 && currentHour < 12;
  };

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
    return greetingMessage
    }

    const sendsms = async () => {
      const result = getCurrentDay();
      const apiKey = "g3p3m8ht";
      const appId = "lpoIXtmD";
      const apiPwd = "lc71fV4F";
      const url = 'https://api.onbuka.com/v3/sendSms';
      const timestamp = Math.floor(Date.now() / 1000);
      const sign = MD5(apiKey + apiPwd + timestamp.toString());
      const number = filteredContactValues.join(',')
      console.log(sign);
      console.log(timestamp);
    
      const payload = {
        content: `ALERT FROM MDRRMC: \n ${form.message}`,
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
            'Sign': sign.toString(enc.Hex),
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
      <LoginFields
        title='Date'
        type='date'
        disabled={false}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        placeholder='Date'
        value={form.date}
      />
      <LoginFields
        title='Time'
        type='time'
        disabled={false}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
        placeholder='Time'
        value={form.time}
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
