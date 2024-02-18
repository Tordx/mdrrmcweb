import React, { useState } from 'react';
import { LoginFields } from 'screens/components/global/fields';
import { disasterdata } from 'types/interfaces';
import { addDoc, doc, setDoc, collection } from '@firebase/firestore';
import { db } from '../../../firebase/index';
import { generateRandomKey } from '../../../firebase/function';
import { CircularProgress } from '@mui/material';
import { faLocationPin, faUser, faUserFriends, faWarning, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';

type Props = {
  success: (e: boolean) => void;
  data: disasterdata | undefined;
};

export default function Edit({ success, data }: Props) {
  const newData = data;
  const [form, setform] = React.useState<disasterdata[]>([
    {
      disaster: newData?.disaster || '',
      id: newData?.id || '',
      date: newData?.date || '',
      center: newData?.center || '',
      evacuees: newData?.evacuees || '',
      response: newData?.response || '',
      agri: newData?.agri || '',
      infra: newData?.infra || '',
      livestock: newData?.livestock || '',
      active: newData?.active || true,
    },
  ]);
  const [isloading, setisloading] = React.useState<boolean>(false);

  const submit = async () => {
    setisloading(true);
  
    // Destructuring form data
    const {
      disaster,
      date,
      center,
      evacuees,
      response,
      agri,
      infra,
      livestock,
      active,
      id,
    } = form[0];
  
    // Basic data validation
    if (!disaster || !date || !center) {
      // Display error message or handle invalid data
      console.error('Invalid data. Please fill in all fields with valid values.');
      setisloading(false);
      return;
    }
  
    try {
      const registrationRef = doc(db, 'disaster', id);
      await setDoc(registrationRef, {
        disaster: disaster,
        date: date,
        center: center,
        evacuees: evacuees,
        response: response,
        agri: agri,
        infra: infra,
        livestock: livestock,
        active: active,
      });
  
      success(false);
      setisloading(false);
    } catch (error) {
      console.error('Something went wrong: ', error);
      setisloading(false);
    }
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
          <LoginFields
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
            type='text'
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
            type='text'
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
            type='text'
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
