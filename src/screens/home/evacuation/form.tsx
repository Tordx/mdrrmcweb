import React, { useState } from 'react';
import { faLocationPin, faUser, faUserAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { LoginFields } from 'screens/components/global/fields';
import { centerdata } from 'types/interfaces';
import { addDoc, collection, setDoc, doc } from '@firebase/firestore';
import { db } from '../../../firebase/index';
import { generateRandomKey } from '../../../firebase/function';
import { CircularProgress } from '@mui/material';

type Props = {
  success: (e: boolean) => void;
};

export default function Form({ success }: Props) {
  const [form, setForm] = React.useState<centerdata[]>([
    {
      center: '',
      address: '',
      capacity: '',
      id: '',
      active: true,
      date: new Date(),
    },
  ]);
  const [isloading, setIsLoading] = React.useState<boolean>(false);

  const submit = async () => {
    setIsLoading(true);
    const { center, address, capacity, active, date } = form[0];

    // Check if required fields are not empty
    if (!center.trim() || !address.trim() || !capacity.trim()) {
      // Display an error message or handle the validation failure as needed
      alert('Center name, address, and maximum capacity cannot be empty');
      setIsLoading(false);
      return;
    }

    try {
      const id = generateRandomKey(25);
      const registrationRef = doc(db, 'center', id);
      await setDoc(registrationRef, {
        center: center,
        address: address,
        capacity: capacity,
        id: id,
        active: true,
        date: date,
      });

      success(false);
      setIsLoading(false);
      alert('Successfully added center');
    } catch (error) {
      console.error('Something went wrong: ', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {isloading ? (
        <CircularProgress />
      ) : (
        <>
          <h1>Add Evacuation Center</h1>
          <LoginFields
            title="Center Name"
            type="text"
            icon={faUser}
            disabled={false}
            onChange={(e) =>
              setForm((prev) => [
                {
                  ...prev[0],
                  center: e.target.value,
                },
              ])
            }
            placeholder="Center Name"
            value={form[0].center}
          />
          <LoginFields
            title="Address"
            type="address"
            icon={faUserAlt}
            disabled={false}
            onChange={(e) =>
              setForm((prev) => [
                {
                  ...prev[0],
                  address: e.target.value,
                },
              ])
            }
            placeholder="Address"
            value={form[0].address}
          />
          <LoginFields
            title="Maximum Capacity"
            type="number"
            icon={faUserFriends}
            disabled={false}
            onChange={(e) => {
              // Allow only numbers (0-9)
              const inputValue = e.target.value.replace(/[^0-9]/g, '');
              setForm((prev) => [
                {
                  ...prev[0],
                  capacity: inputValue,
                },
              ]);
            }}
            placeholder="Maximum Capacity"
            value={form[0].capacity}
          />
          <button onClick={submit} style={{ marginTop: 20 }}>
            Update
          </button>
        </>
      )}
    </div>
  );
}
