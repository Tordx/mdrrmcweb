import React, { useState } from 'react';
import SMSTable from './SMSscreen';
import Modal from 'screens/components/global/modal';
import Card from 'screens/components/global/card';
import SendSMS from './sendSMS';

type Props = {};

export default function SMS({}: Props) {
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState<boolean>(false);
  const [selectedSMS, setSelectedSMS] = useState<any>("");

  const handleAddHeadOfFamily = (e: boolean) => {
    setIsModalAddOpen(e);
  };
  const reloadList = (e: boolean) => {
  console.log('e');
  console.log(e);
  console.log('e');
      
  };

  const handleOpenViewSMS = (e: boolean) => {
    setIsModalViewOpen(e);
  };

  const handleSelectSMS = (e: any) => {
    setSelectedSMS(e);
  };

  return (
    <div className='container'>
      <SMSTable
        onAddHeadOfFamily={handleAddHeadOfFamily}
        openViewSMS={handleOpenViewSMS}
        smsViewData={handleSelectSMS}
        reloadList={reloadList}
      />
      <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
        <Card className='form-wrapper'>
          <SendSMS onAddHeadOfFamily={handleAddHeadOfFamily} reloadList={reloadList} />
        </Card>
      </Modal>
      <Modal isOpen={isModalViewOpen} onClose={() => setIsModalViewOpen(false)}>
        <Card className='form-wrapper1'>
          <div>
            <h4 style={{ color: '#2F5288' }}>Subject: {selectedSMS.subject}</h4>
            <p style={{ margin: '50px 0', fontWeight: 'bold' }}>{selectedSMS.message}</p>
            <button style={{ marginTop: '20px' }} onClick={() => setIsModalViewOpen(false)}>
              Close
            </button>
          </div>
        </Card>
      </Modal>
    </div>
  );
}
