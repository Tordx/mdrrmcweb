import React from 'react';
import SMSTable from './SMSscreen';
import Modal from 'screens/components/global/modal';
import Card from 'screens/components/global/card';
import SendSMS from './sendSMS'; // Assuming SendSMS is the correct component name

type Props = {};

export default function SMS({}: Props) {
  const [isModalAddOpen, setIsModalAddOpen] = React.useState<boolean>(false);
  const [isModalViewOpen, setIsModalViewOpen] = React.useState<boolean>(false);

  return (
    <div className='container'>
      <SMSTable onAddHeadOfFamily={(e) => setIsModalAddOpen(e)} openViewSMS={(e) => setIsModalViewOpen(e)}/>
      <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
        <Card className='form-wrapper'>
          <SendSMS onAddHeadOfFamily={(e) => setIsModalAddOpen(e)} />
        </Card>
        </Modal>
        <Modal isOpen={isModalViewOpen} onClose={() => setIsModalViewOpen(false)}>
        <Card className='form-wrapper'>
          <div>sdsds</div>
        </Card>
      </Modal>
    </div>
  );
}
