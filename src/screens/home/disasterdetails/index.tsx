import { fetchdisaster, fetchdisasterevacuation } from '../../../firebase/function';
import React from 'react'
import { disastercenter, disasterdata } from 'types/interfaces';
import {addDoc, collection, setDoc, doc} from '@firebase/firestore'
import { auth, db, storage } from '../../../firebase/index'
import DisasterEvacTable from './table';
import Modal from 'screens/components/global/modal';
import Card from 'screens/components/global/card';
import Form from './form';
import Edit from './edit';
import { CircularProgress } from '@mui/material';
import { Details } from './details';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
type Props = {}

export default function DisasterDetails({}: Props) {

    const [isModalAddOpen, setIsModalAddOpen] = React.useState<boolean>(false)
    const [isModalEditOpen, setIsModalEditOpen] = React.useState<boolean>(false)
    const [isloading, setisloading] = React.useState<boolean>(false);
    const [editValue, setEditValue] = React.useState<disasterdata>();
    const [disastercenter, setdisastercenter] = React.useState<disastercenter>();

    const [deleteModal, setDeleteModal] = React.useState<boolean>(false)
    const [deleteID, setDeleteID] = React.useState<string>('')
    const { id } = useParams();
    const navigate = useNavigate()
    React.useEffect(() => {
        getData()
    },[])

    const getData = async() => {
        try {
          const result: disasterdata[] = await fetchdisaster(id || '') || [];

          const filteredResult = result[0]
          setEditValue(filteredResult)
          setIsModalEditOpen(false)
        } catch (error) {
  
        }
    }

    const getDisasterEvacuationData = async(id: string) => {
        const result: disastercenter[] = await fetchdisasterevacuation(id) || [];
        const filteredResult = result[0]

        setdisastercenter(filteredResult)
        setIsModalEditOpen(true)
    }
  
    const deleteData = async(id: string) => {
      setisloading(true)
      try {
        const registrationRef = doc(db, 'disastercenter', id)
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
    <FontAwesomeIcon onClick={() => navigate('/admin/disasters')} className='exit-button' icon={faChevronLeft} />
    <Details data={editValue}/>
    <DisasterEvacTable
        value={(e, a) => {getDisasterEvacuationData(e)}}
        archive={(e, b) => {setDeleteModal(e); setDeleteID(b)}}
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
          data = {disastercenter}
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