import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useSortBy, useGlobalFilter, Column, TableState } from 'react-table';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from "@firebase/storage";
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { MD5, enc } from 'crypto-js';
import { fetchRegistrationList } from '../../../firebase/function';
import './sms.css';
import { registrationdata } from '../../../types/interfaces';
import Modal from 'screens/components/global/modal'
import Card from 'screens/components/global/card'
import { CircularProgress } from '@mui/material';
import { log } from 'console';


type Props = {
  onAddHeadOfFamily: (value: boolean) => void;
  openViewSMS: (value: boolean) => void;
  smsViewData: (value: any) => void;
  reloadList: (value: any) => void;
};

const headers = [
  { name: 'subject', id: 'subject' },
  { name: 'message', id: 'message' },
  { name: 'View SMS', id: 'view' },
  { name: 'Delete SMS', id: 'delete' },
];



export default function SMSTable({ openViewSMS, onAddHeadOfFamily, smsViewData, reloadList }: Props) {
  const [tabledata, setTabledata] = useState<registrationdata[]>([]);
  const [selectedSMS, setSelectedSMS] = useState<registrationdata | null>(null);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false)
  const [isloading, setisloading] = React.useState<boolean>(false);
  const [deleteID, setDeleteID] = React.useState<string>('')
  // const [reloaddata, setReloadData] = React.useState<boolean>(false)

  const handleAddHeadOfFamilyClick = () => {
    onAddHeadOfFamily(true);
  };

  const handleViewHeadOfFamilyClick = (data: any) => {
    smsViewData(data);
    openViewSMS(true);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyCKb1B3-_VHWMtSMbkMVjek1bDlmzIDQLA",
    authDomain: "mdrrmc-bdrrmc.firebaseapp.com",
    projectId: "mdrrmc-bdrrmc",
    storageBucket: "mdrrmc-bdrrmc.appspot.com",
    messagingSenderId: "1010058942404",
    appId: "1:1010058942404:web:15461fb754958c39d97691",
    measurementId: "G-TZPWSQ2FKV"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();

  useEffect(() => {
    fetchData();
  }, [reloadList]);

   const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'sms'));
      const newMessages: registrationdata[] = querySnapshot.docs.map((doc) => doc.data() as registrationdata);
      setTabledata(newMessages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const deleteData = async() => {
    try {
      const messagesQuery = query(collection(db, 'sms'), where('id', '==', deleteID));
      const querySnapshot = await getDocs(messagesQuery);

      if (querySnapshot.size === 0) {
        return;
      }

      const documentSnapshot = querySnapshot.docs[0];
      await deleteDoc(doc(db, 'sms', documentSnapshot.id));
      console.log('Document successfully deleted!');
      setDeleteModal(false)
      fetchData();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }


  const deleteMessage = async (data: any) => {
    setDeleteID(data.id)
    setDeleteModal(true)
   
  };

  const columns: Column<any>[] = React.useMemo(
    () =>
      headers.map((header) => ({
        Header: header.name,
        accessor: header.id,
        disableSortBy: header.id === 'delete',
        Cell: ({ row }) =>
          header.id === 'view' ? (
            <div className="edit-view-cell">
              <button
                onClick={() => handleViewHeadOfFamilyClick(row.original)}
                className="view-button"
                style={{ fontSize: '16px' }}
              >
                {header.name}
              </button>
            </div>
          ) : header.id === 'delete' ? (
            <div className="edit-view-cell">
              <button
                onClick={() => deleteMessage(row.original)}
                className="delete-button"
                style={{ fontSize: '16px' }}
              >
                {header.name}
              </button>
            </div>
          ) : (
            row.original[header.id]
          ),
      })),
    [headers]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data: tabledata,
      initialState: { pageIndex: 0, pageSize: 5 } as TableState<registrationdata>,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as any;

  return (
    <div className="table">
      <button onClick={handleAddHeadOfFamilyClick}>+ Compose SMS Notification </button>
      <br />
      <div className="table-itself">
        <h1>SMS Alerts</h1>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      backgroundColor: '#2F5288',
                      color: 'white',
                      padding: '10px',
                      width: '100px',
                    }}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 5 }} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronUp} style={{ marginLeft: 5 }} />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, rowIndex: number) => {
              prepareRow(row);
              return (
                <tr
                  key={rowIndex}
                  {...row.getRowProps()}
                  style={{ backgroundColor: rowIndex % 2 === 0 ? '#ECF1F7' : '#FFFF' }}
                >
                  {row.cells.map((cell: any) => (
                    <td
                      key={cell.row.id}
                      {...cell.getCellProps()}
                      style={{ padding: '10px', color: '#2F5288', fontSize: 14 }}
                    >
                      {typeof cell.value === 'boolean' ? (cell.value ? 'Yes' : 'No') : cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          style={{
            width: '21%',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <button className="pagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <span style={{ marginLeft: 20 }}>
            <strong>{pageIndex + 1}</strong> of {Math.ceil(tabledata.length / pageSize)}
          </span>
          <button className="pagination-button" onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
      </div>
      <Modal
      isOpen = {deleteModal}
      onClose={() => setDeleteModal(false)}
    >
      <Card className='form-wrapper'>
        {isloading ? <CircularProgress/> :
        <div className='form-container'>
            <h1>Are you sure you want to delete this item?</h1>
            <br/>
            <button onClick={() => deleteData()}>YES</button>
            <br/>
            <button onClick={() => setDeleteModal(false)}>NO</button>
        </div>}
      </Card>
    </Modal>
    </div>
  );
}
