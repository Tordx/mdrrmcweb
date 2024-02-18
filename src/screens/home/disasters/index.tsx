import React from 'react'
import Modal from 'screens/components/global/modal'
import Card from 'screens/components/global/card'
import DisasterTable from './table'
import Form from './form'
import { fetchCenters, fetchcenter, fetchdisaster } from '../../../firebase/function'
import { centerdata, disasterdata } from 'types/interfaces'
import {addDoc, collection, setDoc, doc} from '@firebase/firestore'
import { auth, db, storage } from '../../../firebase/index'

import Edit from './edit'
import { CircularProgress } from '@mui/material'

type Props = {}

export default function Disaster({}: Props) {

  const [isModalAddOpen, setIsModalAddOpen] = React.useState<boolean>(false)
  const [isModalEditOpen, setIsModalEditOpen] = React.useState<boolean>(false)
  const [isloading, setisloading] = React.useState<boolean>(false);
  const [editValue, setEditValue] = React.useState<disasterdata>();
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false)
  const [deleteID, setDeleteID] = React.useState<string>('')

  const getData = async(e: string, b: boolean) => {
      try {
        const result: disasterdata[] = await fetchdisaster(e) || [];
        const filteredResult = result[0]
        setEditValue(filteredResult)
        setIsModalEditOpen(b)
      } catch (error) {

      }
  }

  const deleteData = async(id: string) => {
    setisloading(true)
    try {
      const registrationRef = doc(db, 'disaster', id)
      setDoc(registrationRef,{
        id: id,
        active: false,
      }).then((res) => {
        setDeleteModal(false)
        alert('successfully deleted item')
        setisloading(false)
      })
    } catch (error) {
      console.log('Something went wrong: ', error)
      setDeleteModal(false)
      setisloading(false)
    }
  }

  
  return (
    <div className='container'>
      
    <DisasterTable
        archive={(e, b) => {setDeleteModal(e); setDeleteID(b)}}
        value={(e, b) => getData(e, b)} 
        onAddHeadOfFamily={(e) => setIsModalAddOpen(e)}/>
    <Modal
      isOpen = {isModalAddOpen}
      onClose={() => setIsModalAddOpen(false)}
    >
      <Card className='form-wrapper'>
        <Form success={(e) => {setIsModalAddOpen(e)}}/>
      </Card>
    </Modal>
    <Modal
      isOpen = {isModalEditOpen}
      onClose={() => setIsModalEditOpen(false)}
    >
      <Card className='form-wrapper'>
        <Edit
          data = {editValue}
          success={(e) => setIsModalEditOpen(e)}
        
        />
      </Card>
    </Modal>
    <Modal
      isOpen = {deleteModal}
      onClose={() => setDeleteModal(false)}
    >
      <Card className='form-wrapper'>
        {isloading ? <CircularProgress/> :
        <div className='form-container'>
            <h1>Are you sure you want to delete this item?</h1>
            <button onClick={() => deleteData(deleteID)}>YES</button>
            <br/>
            <button onClick={() => setDeleteModal(false)}>NO</button>
        </div>}
      </Card>
    </Modal>
    </div>
  )
}