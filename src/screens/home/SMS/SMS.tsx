import React, { useState, useEffect } from 'react';
import firebase, { initializeApp } from 'firebase/app';
import { getStorage } from "@firebase/storage";
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore , getDocs, collection, addDoc } from 'firebase/firestore';
import './sms.css'
import { MD5, enc } from 'crypto-js';

interface Message {
    subject: string;
    message: string;
  }

function SMS() {
  const [messages, setMessages] = useState<Message[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isMessageDetailsModalOpen, setIsMessageDetailsModalOpen] = useState(false);

  

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



  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'sms'));
        const newMessages: Message[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Message;
          return data;
        });
        setMessages(newMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [subject, message]);

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

  const sendSms = async () => {
    const result = getCurrentDay()
    const apiKey = "g3p3m8ht";
    const appId = "lpoIXtmD";
    const apiPwd = "lc71fV4F";
    const url = 'https://api.onbuka.com/v3/sendSms';
    const timestamp = Math.floor(Date.now() / 1000);
    const sign = MD5(apiKey + apiPwd + timestamp.toString()).toString(enc.Hex);
    const number = "639128410139";
    console.log(sign)
    console.log(timestamp);
    
    const payload = {
      content: message,
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
      })
      const responseData = await response.json();
      console.log("responseData");
      console.log(responseData);
      console.log("responseData");
    } catch (error) {
      console.error(error);
    }
    }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubject("")
    setMessage("")
  };

  const openMessageDetailsModal = (clickedMessage: Message) => {
    setSelectedMessage(clickedMessage);
    setIsMessageDetailsModalOpen(true);
  };

  const closeMessageDetailsModal = () => {
    setIsMessageDetailsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const chatCollection = collection(db, 'sms');
      const newChat = {
        subject,
        message,
        // Add any other fields you want to store in the Firestore document
      };
  
      const docRef = await addDoc(chatCollection, newChat);
  
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    sendSms();
  
    closeModal(); // Close the modal after submission
  };

  
  return (
    <div>
      <h1>SMS</h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={openModal}>Open Modal</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Send SMS</h2>
              <div>
                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <div>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {isMessageDetailsModalOpen && selectedMessage && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Message Details</h2>
              <div>
                <strong>Subject:</strong> {selectedMessage.subject}
              </div>
              <div>
                <strong>Message:</strong> {selectedMessage.message}
              </div>
              <div>
                <button onClick={closeMessageDetailsModal}>Close</button>
              </div>
            </div>
          </div>
        )}

        <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr
                key={index}
                onClick={() => openMessageDetailsModal(message)}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {message.subject}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {message.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SMS;
