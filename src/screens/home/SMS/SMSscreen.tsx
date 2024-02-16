import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchRegistrationList } from '../../../firebase/function'
import React from 'react'
import { registrationdata } from '../../../types/interfaces'
import { useTable, usePagination, useSortBy, useGlobalFilter, Column, TableState } from 'react-table';
import './sms.css'
import { db } from 'firebase/index'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from "@firebase/storage";
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { MD5, enc } from 'crypto-js';
const { Modal } = require('react-bootstrap');

type Props = {
    onAddHeadOfFamily: (value: boolean) => void;
    openViewSMS: (value: boolean) => void;
    
  };
  

const headers = [
    { name: 'subject', id: 'subject' },
    { name: 'message', id: 'message' },
    { name: 'View SMS', id: 'view' }, // Change from 'view' to 'View SMS'
    { name: 'Delete SMS', id: 'delete' }, // Add 'Delete SMS'
  ];
  
export default function SMSTable ({ openViewSMS , onAddHeadOfFamily }: Props) {

    const [tabledata, settabledata] = React.useState<registrationdata[]>([])
    const [selectedSMS, setSelectedSMS] = React.useState<registrationdata | null>(null);

     const viewSMS = (data: any) =>{
        if (data) {
            // Add your logic to send SMS using selectedSMS data
            console.log('Sending SMS:', data);
          }
      }
      const handleAddHeadOfFamilyClick = () => {
        // Here you can access the current data in `tabledata` and pass it to the `onAddHeadOfFamily` function
        onAddHeadOfFamily(true);
      }
      const handleViewHeadOfFamilyClick = (data: any) => {
        console.log('data');
        console.log(data);
        console.log('data');
        
        // Here you can access the current data in `tabledata` and pass it to the `onAddHeadOfFamily` function
        openViewSMS(true);
      }
  
    const firebaseConfig = {
        apiKey: "AIzaSyCKb1B3-_VHWMtSMbkMVjek1bDlmzIDQLA",
        authDomain: "mdrrmc-bdrrmc.firebaseapp.com",
        projectId: "mdrrmc-bdrrmc",
        storageBucket: "mdrrmc-bdrrmc.appspot.com",
        messagingSenderId: "1010058942404",
        appId: "1:1010058942404:web:15461fb754958c39d97691",
        measurementId: "G-TZPWSQ2FKV"
      };
    
      // Initialize Firebase once in the root of your application
      const app = initializeApp(firebaseConfig);
      const auth = getAuth();
      const storage = getStorage();
      const db = getFirestore();

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'sms'));
            const newMessages: registrationdata[] = querySnapshot.docs.map((doc) => doc.data() as registrationdata);
            settabledata(newMessages);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const getCurrentDay = () => {
        const currentHour = new Date().getHours();
        let greetingMessage = '';
    
        if (currentHour >= 0 && currentHour < 12) {
          greetingMessage = 'Good Morning';
        } else if (currentHour >= 12 && currentHour < 17) {
          greetingMessage = 'Good Afternoon';
        } else if (currentHour >= 17 && currentHour < 23) {
          greetingMessage = 'Good Evening';
        }
        return greetingMessage;
      };
    

    const columns: Column<any>[] = React.useMemo(
        () =>
          headers.map((header) => ({
            Header: header.name,
            accessor: header.id,
            disableSortBy: header.id === 'delete', // Disable sorting for "Delete SMS" column
            Cell: ({ row }) =>
              header.id === 'view' ? (
                <div className="edit-view-cell">
            <button 
            onClick={() => handleViewHeadOfFamilyClick(row.original)}
            className="view-button" 
            style={{ fontSize: '16px' }}>{header.name}</button>
                </div>
              ) : header.id === 'delete' ? (
                <div className="edit-view-cell">
            <button className="delete-button" style={{ fontSize: '16px' }}>{header.name}</button>
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
          initialState: { pageIndex: 0, pageSize: 5 } as TableState<registrationdata>, // Explicitly define the type
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
      ) as any;
      
      return (
        <div className="table">
          <button onClick={handleAddHeadOfFamilyClick}>+ Compose SMS Notification </button>
          <br />
          <div className='table-itself'>
            <h1>Registered Head of the Family</h1>
            <div className='search-bar'>
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
                        style={{ backgroundColor: '#2F5288', color: 'white', padding: '10px', width: '100px' }}
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
            <div style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <button className="pagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                Previous
              </button>
              <span>
                Page <strong>{pageIndex + 1}</strong> of {Math.ceil(tabledata.length / pageSize)}
              </span>
              <button className="pagination-button" onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </button>
            </div>
          </div>
        </div>
      );
}