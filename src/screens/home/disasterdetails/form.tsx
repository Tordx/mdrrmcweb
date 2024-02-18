import { faHandsHelping, faLocationPin, faLock, faPhone, faUser, faUserAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { LargeTextField, LoginFields } from 'screens/components/global/fields'
import { centerdata, disastercenter, registrationdata } from 'types/interfaces'
import '../../contents/styles/contents.css'
import '../../components/styles/components.css'
import {addDoc, collection, setDoc, doc} from '@firebase/firestore'
import { auth, db, storage } from '../../../firebase/index'
import { generateRandomKey } from '../../../firebase/function'
import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
type Props = {
  success: (e: boolean) => void,
}

export default function Form({success}: Props) {
  const {id} = useParams()
  const [form, setform] = React.useState<disastercenter[]>([
   { center: '',
    evacuees: '',
    services: '',
    disasterid: id || '',
    id: '',
    active: true,
    date: new Date(),
   }
  ]);
  const [isloading, setisloading] = React.useState<boolean>(false)

  const submit = async() => {
    setisloading(true)
    const {
    center,
    evacuees,
    services,
    active,
    date,
    id,
    disasterid
    } = form[0]

    try {
      const id = generateRandomKey(25)
      const registrationRef = doc(db, 'disastercenter', id)
      setDoc(registrationRef,{
        center: center,
        evacuees: evacuees,
        services: services,
        disasterid: disasterid,
        id: id,
        active: true,
        date: date,
      }).then((res) => {
        success(false)
        setisloading(false)
        alert('Successfully added center')
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
      <h1>Add Evacuation Center</h1>
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
            title='Evacuees'
            type  ='address'
            icon = {faUserAlt}
            disabled = {false}
            onChange={(e) => setform((prev) => [
                {
                  ...prev[0],
                  evacuees: e.target.value,
                },
              ])}
            placeholder= 'How many Evacuees' 
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
              Add Evacuation Center
        </button>
      </>
      }
    </div>
  )
}