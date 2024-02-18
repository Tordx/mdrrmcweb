import { faHandsHelping, faLocationPin, faLock, faPhone, faUser, faUserAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { LargeTextField, LoginFields, Select } from 'screens/components/global/fields'
import { centerdata, disastercenter, registrationdata } from 'types/interfaces'
import '../../contents/styles/contents.css'
import '../../components/styles/components.css'
import {addDoc, collection, setDoc, doc} from '@firebase/firestore'
import { auth, db, storage } from '../../../firebase/index'
import { generateRandomKey } from '../../../firebase/function'
import { CircularProgress } from '@mui/material'
import { barangay } from '../statistics/barangay'
type Props = {
  success: (e:boolean) => void,
  data: disastercenter  | undefined
}

export default function Edit ({success, data}: Props) {
  const newData = data
  const [form, setform] = React.useState<disastercenter[]>([
   { 
    center: newData?.center ||'',
    evacuees:  newData?.evacuees || '',
    id: newData?.id || '',
    active: newData?.active || true,
    date: new Date(),
    services: newData?.services || '',
    disasterid: newData?.disasterid || '',

}
  ])
  const [isloading, setisloading] = React.useState<boolean>(false)

  const submit = async() => {
    setisloading(true)
    const {
        center,
        evacuees,
        id,
        active,
        date,
        services,
        disasterid,
    } = form[0]

    try {
      const registrationRef = doc(db, 'center', id)
      setDoc(registrationRef,{
        center: center,
        evacuees: evacuees,
        id: id,
        active: active,
        date: date,
        services: services,
        disasterid: disasterid,
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
      <h1>Edit Disaster Evacuation Center</h1>
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
            title = 'Evacuees'
            type  ='text'
            icon = {faUserAlt}
            disabled = {false}
            onChange={(e) => setform((prev) => [
                {
                  ...prev[0],
                  evacuees: e.target.value,
                },
              ])}
            placeholder= 'Insert Evacuees' 
            value= {form[0].evacuees} 
        />
        <LargeTextField 
            title = 'Response/Services'
            type  ='text'
            disabled = {false}
            onChange={(e) => setform((prev) => [
                {
                ...prev[0],
                services: e.target.value,
                },
            ])}
            placeholder= 'What are the response/services offered' 
            value= {form[0].services}
        />
        <button onClick = {submit} style = {{marginTop: 20}}>
              Update
        </button>
      </>
      }
    </div>
  )
}