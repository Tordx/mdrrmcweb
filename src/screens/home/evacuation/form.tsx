import { faLocationPin, faLock, faPhone, faUser, faUserAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { LoginFields } from 'screens/components/global/fields'
import { registrationdata } from 'types/interfaces'
import '../../contents/styles/contents.css'
import '../../components/styles/components.css'
type Props = {}

export default function Form({}: Props) {

  const [form, setform] = React.useState<registrationdata[]>([
   { firstname: '',
    middlename: '',
    lastname: '',
    suffix: '',
    address: '',
    contact: '',
    contact1: '',
    contact2: '',
    families: '',
    id: '',
    type: '',}
  ])


  return (
    <div className='form-container'>
    <h1>Add Evacuation Center</h1>
        <LoginFields
            title='Center Name'
            type  ='text'
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
            title='Address'
            type  ='address'
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
            title = 'Maximum Capacity'
            type  ='text'
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
        
        {/* <button onClick = {updateaccount} style = {{marginTop: 20}}>
              Update
        </button> */}
    </div>
  )
}