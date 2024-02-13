import React from 'react'
import RegistrationTable from './table'
import Modal from 'screens/components/global/modal'
import Card from 'screens/components/global/card'
import Form from './form'

type Props = {}

export default function Registration({}: Props) {

  const [isModalAddOpen, setIsModalAddOpen] = React.useState<boolean>(false)

  return (
    <div className='container'>
      
    <RegistrationTable onAddHeadOfFamily={(e) => setIsModalAddOpen(e)}/>
    <Modal
      isOpen = {isModalAddOpen}
      onClose={() => setIsModalAddOpen(false)}
    >
      <Card className='form-wrapper'>
        <Form/>
      </Card>
    </Modal>
    </div>
  )
}