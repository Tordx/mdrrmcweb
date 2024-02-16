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
    subject: '',
    message: '',
    type: '',}
  ])

  return (
    <div className='form-container'>
    <h1>Community Registration</h1>
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
        <LoginFields
            title = 'Address'
            type  ='address'
            icon = {faLocationPin}
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
        {/* <button onClick = {updateaccount} style = {{marginTop: 20}}>
              Update
        </button> */}
    </div>
  )
}