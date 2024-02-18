import { faChevronDown, faChevronUp, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchCenters, fetchRegistrationList } from '../../../firebase/function'
import React from 'react'
import { centerdata, registrationdata } from '../../../types/interfaces'
import { useTable, usePagination, useSortBy, useGlobalFilter, Column } from 'react-table';
import './evacuation.css'
import { onSnapshot, collection, query, where } from '@firebase/firestore';
import { db } from '../../../firebase/index'; // Assuming you have firebase configuration set up

type Props = {
  onAddHeadOfFamily: (value: boolean) => void;
  value: (e: any, b: any) => void;
  archive: (e: boolean, b: string) => void;

};

const headers = [
  {name: 'Center', id: 'center'},
  {name: 'Address', id: 'address'},
  {name: 'Total capacity', id: 'capacity'},
  {name: 'id', id:'id'},
  { name: 'Edit', id: 'edit' },
]

export default function EvacuationTable({ onAddHeadOfFamily, value, archive }: Props) {

    const [tabledata, settabledata] = React.useState<centerdata[]>([])

    const handleAddHeadOfFamilyClick = () => {
      onAddHeadOfFamily(true);
    }

    React.useEffect(() => {
      let unsubscribe: void | (() => void); // Explicitly specify the type of unsubscribe
    
      try {
        unsubscribe = fetchCentersAuto();
      } catch (error) {
        console.log(error);
      }
    
      // Return a cleanup function
      return () => {
        if (unsubscribe) { // Check if unsubscribe is defined before calling
          unsubscribe(); // Call unsubscribe if it exists
        }
      };
    }, []);

    const fetchCentersAuto = () => {
      try {
        const q = query(collection(db, 'center'), where("active", "==", true));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newData: centerdata[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data) { // Check if data is not undefined
              newData.push({
                center: data.center || "",
                address: data.address || "",
                capacity: data.capacity || "",
                id: data.id || "",
                active: data.active || false,
                date: data.date || new Date()
              });
            }
          });
          settabledata(newData);
        });
  
        return unsubscribe;
      } catch (error) {
        console.log(error);
      }
    };

    const passdata = (id: string) => {
      value(id, true)
    }

    const deletedata = (id: string) => {
      archive(true, id)
  }

    const columns: Column<any>[] = React.useMemo(
      () =>
        headers.map((header) => ({
          Header: header.name,
          accessor: header.id,
          disableSortBy: header.id === 'edit' || header.id === 'view',
          Cell: ({ row }) =>
            header.id === 'edit' || header.id === 'view' ? (
                <div className = 'table-button-container'>
              <button onClick={() => { passdata(row.original.id) }} className='pagination-button'>{header.id === 'edit' ? 'Edit' : 'View'}</button>
              <FontAwesomeIcon onClick={() => deletedata(row.original.id)} icon={faTrash} className='icon-button'/>
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
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        
      } = useTable(
        {
          columns,
          data: tabledata,
          initialState: { pageIndex: 0, pageSize: 5 } as any,
        },
    
        useGlobalFilter,
        useSortBy,
        usePagination,
      ) as any;

  return (
    <div className="evacuation-table">
        <button onClick={handleAddHeadOfFamilyClick}>+ Add Evacuation Center </button>
        <br/>
          <div className='evacuation-table-itself'>
            <h1>Evacuation Centers</h1>
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
            <div style={{ width: '21%', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
              <button className="pagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                Previous
              </button>
              <span style = {{marginLeft: 20}}>
                 <strong>{pageIndex + 1}</strong> of {Math.ceil(tabledata.length / pageSize)}
              </span>
              <button className="pagination-button" onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </button>
            </div>

        </div>
          </div>
  )
}