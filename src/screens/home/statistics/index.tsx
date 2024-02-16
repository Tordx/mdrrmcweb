import React, { useState } from 'react'
import Graph from './graph'
import { registrationdata } from 'types/interfaces'
import {onSnapshot,collection, setDoc, doc} from '@firebase/firestore'
import { db } from '../../../firebase/index'
import { AuthContext } from 'auth'
import DisasterTable from './table'
type Props = {}

export default function Statistics({}: Props) {

  const [data, setdata] = useState<registrationdata[]>([])

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'post'), (snapshot) => {
      const result: registrationdata[] = [];
      snapshot.forEach((doc) => {
        const postData = doc.data();
          result.push({
            firstname: doc.data().firstname,
            middlename: doc.data().middlename,
            lastname: doc.data().lastname,
            suffix: doc.data().suffix,
            address: doc.data().address,
            contact: doc.data().contact,
            contact1: doc.data().contact1,
            contact2: doc.data().contact2,
            families: doc.data().families,
            id: doc.data().id,
            type: doc.data().type,
          });
      });
      setdata(result)
    })
    return () => unsubscribe()
  },[])

  return (
    <div className='container'>
      <br/>
      <br/>
      <br/>
        <Graph chartdata={data}/>
        <DisasterTable/>
    </div>
  )
}