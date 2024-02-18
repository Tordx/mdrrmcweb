import { faLocationPin, faLock, faMoneyCheckAlt, faPhone, faUser, faUserAlt, faUserFriends, faWarning } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { LoginFields, Select } from 'screens/components/global/fields'
import { centerdata, disasterdata, registrationdata } from 'types/interfaces'
import '../../contents/styles/contents.css'
import '../../components/styles/components.css'
import {addDoc, collection, setDoc, doc} from '@firebase/firestore'
import { auth, db, storage } from '../../../firebase/index'
import { generateRandomKey } from '../../../firebase/function'
import { CircularProgress } from '@mui/material'
import { barangay } from '../statistics/barangay'
type Props = {
  success: (e:boolean) => void,
  data: disasterdata | undefined
}

export default function Edit({success, data}: Props) {
  const newData = data
  const [form, setform] = React.useState<disasterdata[]>([
   { 
    disaster: newData?.disaster || '',
    id:  newData?.id || '',
    date:  newData?.date || '',
    center:  newData?.center || '',
    evacuees:  newData?.evacuees || '',
    response:  newData?.response || '',
    agri:  newData?.agri || '',
    infra:  newData?.infra || '',
    livestock:  newData?.livestock || '',
    active:  newData?.active || true,

}
  ])
  const [isloading, setisloading] = React.useState<boolean>(false)

  const submit = async() => {
    setisloading(true)
    const {
      disaster,
      date,
      center ,
      evacuees ,
      response ,
      agri ,
      infra ,
      livestock ,
      active,
      id,
    } = form[0]

    try {
      const registrationRef = doc(db, 'disaster', id)
      setDoc(registrationRef,{
        disaster: disaster,
        date: date,
        center: center ,
        evacuees: evacuees ,
        response: response ,
        agri: agri ,
        infra: infra ,
        livestock: livestock ,
        active: active,
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
        <h1>Add Disaster Record</h1>
        <h5>Kindly input details below</h5>

          <LoginFields
              title='Disaster'
              type  ='text'
              icon = {faWarning}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    disaster: e.target.value,
                  },
                ])}
              placeholder= 'Add Disaster' 
              value= {form[0].disaster} 
          />
          <LoginFields
              title='Date'
              type  ='date'
              disabled = {false}
              onChange={(e) =>{ 
                const formattedDate = e.target.value
                setform((prev) => [
                  {
                    ...prev[0],
                    date: formattedDate.toString(),
                  },
                ])}
            }
              placeholder= 'date' 
              value= {form[0].date} 
          />
          <LoginFields
              title = 'Evacuation Center'
              type  ='text'
              icon = {faLocationPin}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    center: e.target.value,
                  },
                ])}
              placeholder= 'Add Evacuation Center' 
              value= {form[0].center} 
          />
          <LoginFields
              title = 'Evacuees'
              type  ='text'
              icon = {faUserFriends}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    evacuees: e.target.value,
                  },
                ])}
              placeholder= 'Evacuees' 
              value= {form[0].evacuees} 
          />
          <LoginFields
              title = 'Responses'
              type  ='text'
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    response: e.target.value,
                  },
                ])}
              placeholder= 'Responses/Services' 
              value= {form[0].response} 
          />
           <h1>Damages</h1>
           <h5>Kindly input details below</h5>
          <LoginFields
              title = 'Agriculture Damages'
              type  ='text'
              icon = {faMoneyCheckAlt}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    agri: e.target.value,
                  },
                ])}
              placeholder= 'Estimated damage taken' 
              value= {form[0].agri} 
          />
          <LoginFields
              title = 'Infrastructure Damages'
              type  ='text'
              icon = {faMoneyCheckAlt}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    infra: e.target.value,
                  },
                ])}
              placeholder= 'Estimated damage taken' 
              value= {form[0].infra} 
          />
          <LoginFields
              title = 'Livestock Damages'
              type  ='text'
              icon = {faMoneyCheckAlt}
              disabled = {false}
              onChange={(e) => setform((prev) => [
                  {
                    ...prev[0],
                    livestock: e.target.value,
                  },
                ])}
              placeholder= 'Estimated damage taken' 
              value= {form[0].livestock} 
          />
         
          <button onClick = {submit} style = {{marginTop: 20}}>
                Add
          </button>
        </>
      }
    </div>
  )
}