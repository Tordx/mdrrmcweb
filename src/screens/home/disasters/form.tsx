import React, { useState } from 'react';
import { LargeTextField, LoginFields } from 'screens/components/global/fields';
import { disasterdata } from 'types/interfaces';
import { addDoc, doc, setDoc } from '@firebase/firestore';
import { db } from '../../../firebase/index';
import { generateRandomKey } from '../../../firebase/function';
import { CircularProgress } from '@mui/material';
import { faLocationPin, faUserFriends, faWarning, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';

type Props = {
  success: (e: boolean) => void;
};

export default function Form({ success }: Props) {
  const [form, setform] = React.useState<disasterdata[]>([
    {
      disaster: '',
      id: '',
      date: '',
      time: '',
      center: '',
      evacuees: '',
      response: '',
      agri: '',
      infra: '',
      livestock: '',
      totaldamage: '',
      active: true,
    },
  ]);
  const [isloading, setisloading] = React.useState<boolean>(false);

  const submit = async () => {
    setisloading(true);
  
    // Destructuring form data
    const {
      disaster,
      date,
      time,
      center,
      evacuees,
      response,
      agri,
      infra,
      livestock,
      // totaldamage,
      active,
    } = form[0];
  
    // Basic data validation
    if (!disaster || !date || !time || !center ) {
      // Display error message or handle invalid data
      alert('Invalid data. Please fill in all fields with valid values.');
      setisloading(false);
      return;
    }

    const infraValue = parseInt(infra, 10) || 0; // Default to 0 if conversion fails
    const livestockValue = parseInt(livestock, 10) || 0;
    const agriValue = parseInt(agri, 10) || 0;

  // Calculate total damage by adding up the values
   const totaldamage = infraValue + livestockValue + agriValue;
  
    try {
      const id = generateRandomKey(25);
  
      // Additional check for ID uniqueness if needed
      // You may want to verify that the generated ID is unique in your database
  
      const registrationRef = doc(db, 'disaster', id);
      await setDoc(registrationRef, {
        disaster: disaster,
        id: id,
        date: date,
        time: time,
        center: center,
        evacuees: evacuees,
        response: response,
        agri: agri,
        infra: infra,
        livestock: livestock,
        active: active,
        totaldamage: totaldamage,
        isAM: isAM()
      });
      success(false);
      setisloading(false);
    } catch (error) {
      console.error('Something went wrong: ', error);
      setisloading(false);
    }
  };
  const isAM = () => {
    const currentHour = parseInt(form[0].time.split(':')[0], 10);
    return currentHour >= 0 && currentHour < 12;
  };
  

  return (
    <div className='form-container'>
      {isloading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <h1>Add Disaster Record</h1>
          <h5>Kindly input details below</h5>

          <LoginFields
            title='Disaster'
            type='text'
            icon={faWarning}
            disabled={false}
            onChange={(e) =>
              setform((prev) => [
                {
                  ...prev[0],
                  disaster: e.target.value,
                },
              ])
            }
            placeholder='Add Disaster'
            value={form[0].disaster}
          />
          <LoginFields
            title='Date'
            type='date'
            disabled={false}
            onChange={(e) => {
              const formattedDate = e.target.value;
              setform((prev) => [
                {
                  ...prev[0],
                  date: formattedDate.toString(),
                },
              ]);
            }}
            placeholder='date'
            value={form[0].date}
          />
          <LoginFields
            title='Time'
            type='time'
            disabled={false}
            onChange={(e) => {
              const formattedDate = e.target.value;
              setform((prev) => [
                {
                  ...prev[0],
                  time: formattedDate.toString(),
                },
              ]);
            }}
            placeholder='date'
            value={form[0].time}
          />
          <LoginFields
            title='Evacuation Center'
            type='text'
            icon={faLocationPin}
            disabled={false}
            onChange={(e) =>
              setform((prev) => [
                {
                  ...prev[0],
                  center: e.target.value,
                },
              ])
            }
            placeholder='Add Evacuation Center'
            value={form[0].center}
          />
          <LoginFields
            title='Evacuees'
            type='text'
            icon={faUserFriends}
            disabled={false}
            onChange={(e) =>
              setform((prev) => [
                {
                  ...prev[0],
                  evacuees: e.target.value,
                },
              ])
            }
            placeholder='Evacuees'
            value={form[0].evacuees}
          />
          <LargeTextField
            title='Responses'
            type='text'
            disabled={false}
            onChange={(e) =>
              setform((prev) => [
                {
                  ...prev[0],
                  response: e.target.value,
                },
              ])
            }
            placeholder='Responses/Services'
            value={form[0].response}
          />
          <h1>Damages</h1>
          <h5>Kindly input details below</h5>
          <LoginFields
            title='Agriculture Damages'
            type='number'
            icon={faMoneyCheckAlt}
            disabled={false}
            onChange={(e) =>
              setform((prev) => [
                {
                  ...prev[0],
                  agri: e.target.value,
                },
              ])
            }
            placeholder='Estimated damage taken'
            value={form[0].agri}
          />
          <LoginFields
            title='Infrastructure Damages'
            type='number'
            icon={faMoneyCheckAlt}
            disabled={false}
            onChange={(e) =>
              setform((prev) => [
                {
                  ...prev[0],
                  infra: e.target.value,
                },
              ])
            }
            placeholder='Estimated damage taken'
            value={form[0].infra}
          />
          <LoginFields
            title='Livestock Damages'
            type='number'
            icon={faMoneyCheckAlt}
            disabled={false}
            onChange={(e) =>
              setform((prev) => [
                {
                  ...prev[0],
                  livestock: e.target.value,
                },
              ])
            }
            placeholder='Estimated damage taken'
            value={form[0].livestock}
          />

          <button onClick={submit} style={{ marginTop: 20 }}>
            Add
          </button>
        </>
      )}
    </div>
  );
}
