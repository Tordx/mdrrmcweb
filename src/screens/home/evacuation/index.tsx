import React from 'react'
import Modal from 'screens/components/global/modal'
import Card from 'screens/components/global/card'
import EvacuationTable from './table'
import Form from './form'
import { fetchCenters, fetchcenter } from '../../../firebase/function'
import { centerdata } from 'types/interfaces'
import Edit from './edit'
import {addDoc, collection, setDoc, doc} from '@firebase/firestore'
import { auth, db, storage } from '../../../firebase/index'
import { CircularProgress } from '@mui/material'
type Props = {}

export default function Evactuation({}: Props) {

  const [isModalAddOpen, setIsModalAddOpen] = React.useState<boolean>(false)
  const [isModalEditOpen, setIsModalEditOpen] = React.useState<boolean>(false)
  const [success, setsuccess] = React.useState<boolean>(false);
  const [isloading, setisloading] = React.useState<boolean>(false);
  const [editValue, setEditValue] = React.useState<centerdata>()
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false)
  const [deleteID, setDeleteID] = React.useState<string>('')

  const getData = async(a: string, e: boolean) => {
    console.log('this: ', e)
      try {
        const result: centerdata[] = await fetchcenter(a) || [];
        const filteredResult = result[0]
        setEditValue(filteredResult)
        setIsModalEditOpen(true)
      } catch (error) {
        console.log(error)
      }
  }

  const deleteData = async(id: string) => {
    setisloading(true)
    try {
      const registrationRef = doc(db, 'center', id)
      setDoc(registrationRef,{
        id: id,
        active: false,
      }).then((res) => {
        setDeleteModal(false)
        setisloading(false)
        alert('successfully deleted item')

      })
    } catch (error) {
      console.log('Something went wrong: ', error)
      setDeleteModal(false)
      setisloading(false)
    }
  }

  
  return (
    <div className='container'>
      
    <EvacuationTable
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
            <br/>
            <button onClick={() => deleteData(deleteID)}>YES</button>
            <br/>
            <button onClick={() => setDeleteModal(false)}>NO</button>
        </div>}
      </Card>
    </Modal>
    </div>
  )
}