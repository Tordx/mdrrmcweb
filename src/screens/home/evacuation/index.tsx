import React from 'react'
import Modal from 'screens/components/global/modal'
import Card from 'screens/components/global/card'
import EvacuationTable from './table'
import Form from './form'

type Props = {}

export default function Evactuation({}: Props) {

  const [isModalAddOpen, setIsModalAddOpen] = React.useState<boolean>(false)

  return (
    <div className='container'>
      
    <EvacuationTable onAddHeadOfFamily={(e) => setIsModalAddOpen(e)}/>
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