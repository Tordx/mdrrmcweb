import React from 'react';
import SMSTable from './SMSscreen';
import Modal from 'screens/components/global/modal';
import Card from 'screens/components/global/card';
import SendSMS from './sendSMS'; // Assuming SendSMS is the correct component name

type Props = {};

export default function SMS({}: Props) {
  const [isModalAddOpen, setIsModalAddOpen] = React.useState<boolean>(false);
  const [isModalViewOpen, setIsModalViewOpen] = React.useState<boolean>(false);
  const [selectedSMS, setSelectedSMS] = React.useState<any>("");

  console.log('selectedSMS');
  console.log(selectedSMS);
  console.log('selectedSMS');
  

  return (
    <div className='container'>
      <SMSTable onAddHeadOfFamily={(e) => setIsModalAddOpen(e)} openViewSMS={(e) => setIsModalViewOpen(e)} smsViewData={(e) => setSelectedSMS(e)}/>
      <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
        <Card className='form-wrapper'>
          <SendSMS onAddHeadOfFamily={(e) => setIsModalAddOpen(e)} />
        </Card>
        </Modal>
        <Modal isOpen={isModalViewOpen} onClose={() => setIsModalViewOpen(false)}>
        <Card className='form-wrapper1'>
           <div>
      <h4 style={{ color: '#2F5288' }}>Subject: {selectedSMS.subject}</h4>
      <p style={{ margin: '50px 0', fontWeight: 'bold' }}>{selectedSMS.message}</p>
      <button style={{ marginTop: '20px' }} onClick={() => setIsModalViewOpen(false)}>Close</button>
    </div>
        </Card>
      </Modal>
    </div>
  );
}
