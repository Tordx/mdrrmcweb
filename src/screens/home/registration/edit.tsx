import { faLocationPin, faLock, faPhone, faUser, faUserAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { LoginFields, Select } from 'screens/components/global/fields'
import { registrationdata } from 'types/interfaces'
import '../../contents/styles/contents.css'
import '../../components/styles/components.css'
import {addDoc, collection, setDoc, doc} from '@firebase/firestore'
import { auth, db, storage } from '../../../firebase/index'
import { generateRandomKey } from '../../../firebase/function'
import { CircularProgress } from '@mui/material'
import { barangay } from '../statistics/barangay'
type Props = {
  success: (e:boolean) => void,
  data: registrationdata | undefined
}

export default function Edit({success, data}: Props) {
  const newData = data
  const [form, setform] = React.useState<registrationdata[]>([
   { firstname: newData?.firstname || '', 
    middlename: newData?.middlename || '',
    lastname: newData?.lastname || '',
    suffix: newData?.suffix || '',
    address: newData?.address || '',
    contact: newData?.contact || '',
    contact1: newData?.contact1 || '',
    contact2: newData?.contact2 || '',
    families: newData?.families || '',
    id: newData?.id || '',
    type: newData?.type || '',
    active: newData?.active || true,
    subject: newData?.subject || '',
    message: newData?.message || '',

}
  ])
  const [isloading, setisloading] = React.useState<boolean>(false)

  const submit = async() => {
    setisloading(true)
    const {
      firstname ,
      middlename ,
      lastname ,
      suffix ,
      address ,
      contact ,
      contact1 ,
      contact2 ,
      families ,
      id,
    } = form[0]

    try {
      const registrationRef = doc(db, 'registration', id)
      setDoc(registrationRef,{
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        suffix: suffix,
        address: address,
        contact: contact,
        contact1: contact1,
        contact2: contact2,
        families: families,
        id: id,
        type: 'fam',
        active: true,
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
        <h1>Edit Head of the Family Registration</h1>
          <LoginFields
              title='First Name'
              type  ='firstname'
              icon = {faUser}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    firstname: e.target.value,
                  },
                ])}
              placeholder= 'First Name' 
              value= {form[0].firstname} 
          />
          <LoginFields
              title='Middle Name'
              type  ='middlename'
              icon = {faUserAlt}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    middlename: e.target.value,
                  },
                ])}
              placeholder= 'Middle Name' 
              value= {form[0].middlename} 
          />
          <LoginFields
              title = 'Last Name'
              type  ='lastname'
              icon = {faUserAlt}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    lastname: e.target.value,
                  },
                ])}
              placeholder= 'Last Name' 
              value= {form[0].lastname} 
          />
          <LoginFields
              title = 'Suffix'
              type  ='suffix'
              icon = {faUserAlt}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    suffix: e.target.value,
                  },
                ])}
              placeholder= 'Suffix' 
              value= {form[0].suffix} 
          />
          <Select
              title = 'Address'
              selection={barangay}
              icon = {faLocationPin}
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
              title = 'Contact'
              type  ='contact'
              icon = {faPhone}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    contact: e.target.value,
                  },
                ])}
              placeholder= 'Contact' 
              value= {form[0].contact} 
          />
          <LoginFields
              title = 'Contact Alternative (optional)'
              type  ='contact'
              icon = {faPhone}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    contact1: e.target.value,
                  },
                ])}
              placeholder= 'Contact Alternative' 
              value= {form[0].contact1} 
          />
          <LoginFields
              title = 'Contact Alternative (optional)'
              type  ='contact'
              icon = {faPhone}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    contact2: e.target.value,
                  },
                ])}
              placeholder= 'Contact Alternative' 
              value= {form[0].contact2} 
          />
          <LoginFields
              title = 'Number of Families'
              type  ='text'
              icon = {faUserFriends}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    families: e.target.value,
                  },
                ])}
              placeholder= 'Number of Families' 
              value= {form[0].families} 
          />
          <button onClick = {submit} style = {{marginTop: 20}}>
                Add
          </button>
        </>
      }
    </div>
  )
}