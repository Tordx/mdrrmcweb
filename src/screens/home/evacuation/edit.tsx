import { faLocationPin, faLock, faPhone, faUser, faUserAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { LoginFields, Select } from 'screens/components/global/fields'
import { centerdata, registrationdata } from 'types/interfaces'
import '../../contents/styles/contents.css'
import '../../components/styles/components.css'
import {addDoc, collection, setDoc, doc} from '@firebase/firestore'
import { auth, db, storage } from '../../../firebase/index'
import { generateRandomKey } from '../../../firebase/function'
import { CircularProgress } from '@mui/material'
import { barangay } from '../statistics/barangay'
type Props = {
  success: (e:boolean) => void,
  data: centerdata | undefined
}

export default function Edit ({success, data}: Props) {
  const newData = data
  const [form, setform] = React.useState<centerdata[]>([
   { 
    center: newData?.center ||'',
    address: newData?.address || '',
    capacity:  newData?.capacity || '',
    id: newData?.id || '',
    active: newData?.active || true,
    date: new Date(),


}
  ])
  const [isloading, setisloading] = React.useState<boolean>(false)

  const submit = async() => {
    setisloading(true)
    const {
        center,
        address,
        capacity,
        id,
        active,
        date,
    } = form[0]

    try {
      const registrationRef = doc(db, 'center', id)
      setDoc(registrationRef,{
        center: center,
        address: address,
        capacity: capacity,
        id: id,
        active: active,
        date: date,
      }).then((res) => {
        success(false)
        setisloading(false)
      })
    } catch (error) {
      console.log('Something went wrong: ', error)
      setisloading(false)
    }
  }

  return (
    <div className='form-container'>
    {isloading ? 
    <>
      <CircularProgress/>
    </>
    :
    <>
      <h1>Edit Evacuation Center</h1>
        <LoginFields
            title='Center Name'
            type  ='text'
            icon = {faUser}
            disabled = {false}
            onChange={(e) => setform((prev) => [
                {
                  ...prev[0],
                  center: e.target.value,
                },
              ])}
            placeholder= 'Center Name' 
            value= {form[0].center} 
        />
        <LoginFields
            title='Address'
            type  ='address'
            icon = {faUserAlt}
            disabled = {false}
            onChange={(e) => setform((prev) => [
                {
                  ...prev[0],
                  address: e.target.value,
                },
              ])}
            placeholder= 'Address' 
            value= {form[0].address} 
        />
        <LoginFields
  title='Maximum Capacity'
  type='number'
  icon={faUserAlt}
  disabled={false}
  onChange={(e) => {
    // Allow only numbers (0-9)
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    setform((prev) => [
      {
        ...prev[0],
        capacity: inputValue,
      },
    ]);
  }}
  placeholder='Maximum Capacity'
  value={form[0].capacity}
/>

        
        <button onClick = {submit} style = {{marginTop: 20}}>
              Update
        </button>
      </>
      }
    </div>
  )
}