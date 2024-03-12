import { faChevronDown, faChevronUp, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchCenters, fetchDisasterList, fetchRegistrationList } from '../../../firebase/function'
import React from 'react'
import { centerdata, disasterdata, registrationdata } from '../../../types/interfaces'
import { useTable, usePagination, useSortBy, useGlobalFilter, Column } from 'react-table';
import './disasters.css'
import { useNavigate } from 'react-router-dom'

type Props = {
  onAddHeadOfFamily: (value: boolean) => void;
  value: (e: string, b: boolean) => void;
  archive: (e: boolean, b: string) => void;
};

const headers = [
  {name: 'Name', id: 'disaster'},
  {name: 'Date', id: 'date'},
  {name: 'Time', id: 'time'},
  {name: 'Total Evacuees', id: 'evacuees'},
  { name: 'Action', id: 'edit' },
]

export default function DisasterTable({ onAddHeadOfFamily, value, archive }: Props) {

    const [tabledata, settabledata] = React.useState<disasterdata[]>([])

    const navigate = useNavigate()
    const handleAddHeadOfFamilyClick = () => {
      onAddHeadOfFamily(true);
    }
    React.useEffect(() => {
        getDisaster()
    },[value , archive])

    const getDisaster = async( ) => {
        const result: disasterdata[] = await fetchDisasterList() || []
        settabledata(result)
    }

    const passdata = (id: string) => {
      value(id, true)
      console.log(id)
    }

    const deletedata = (id: string) => {
        archive(true, id)
    }

    const openView = (id: string) => {
        navigate(`/admin/disasters/details/${id}`)
    }
    const formatTime = (timeString: string, isAM: boolean) => {
      const date = new Date(`2000-01-01T${timeString}`);
      
      // Adjust the time based on the isAM field
      if (!isAM) {
        date.setHours(date.getHours() + 12);
      }
    
      const hours = (date.getHours() % 12) || 12; // Ensure 12-hour format
      const minutes = date.getMinutes();
      const period = isAM ? 'AM' : 'PM'; // Use isAM parameter to determine AM or PM
    
      const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
      return formattedTime;
    };

    const totalAgriDamages = tabledata.reduce((acc, current) => acc + (parseInt(current.agri) || 0), 0);
    const totalInfraDamages = tabledata.reduce((acc, current) => acc + (parseInt(current.infra) || 0), 0);
    const totalLivestockDamages = tabledata.reduce((acc, current) => acc + (parseInt(current.livestock) || 0), 0);
    const totalDamages = totalAgriDamages + totalInfraDamages + totalLivestockDamages;

const updatedHeaders = [...headers, { name: 'Total Damages', id: 'totalDamages' }];

const columns: Column<any>[] = React.useMemo(
  () =>
    updatedHeaders.map((header) => ({
      Header: header.name,
      accessor: header.id,
      disableSortBy: header.id === 'edit' || header.id === 'view' || header.id === 'totalDamages',
      Cell: ({ row }) =>
        header.id === 'edit' || header.id === 'view' ? (
          <div className='table-button-container'>
            <button onClick={() => { passdata(row.original.id) }} className='pagination-button'>{header.id === 'edit' ? 'Edit' : 'View'}</button>
            <button onClick={() => { openView(row.original.id) }} className='pagination-button'>{header.id === 'edit' ? 'View' : 'Edit'}</button>
            <FontAwesomeIcon onClick={() => deletedata(row.original.id)} icon={faTrash} className='icon-button'/>
          </div>
        ) : header.id === 'totalDamages' ? (
          <div>{totalDamages}</div>
          ) : header.id === 'time' ? (
            <div>
              {formatTime(row.original.time, row.original.isAM)}
            </div>
        ) : (
          row.original[header.id]
        ),
    })),
  [headers]
);



    // const columns: Column<any>[] = React.useMemo(
    //   () =>
    //     headers.map((header) => ({
    //       Header: header.name,
    //       accessor: header.id,
    //       disableSortBy: header.id === 'edit' || header.id === 'view',
    //       Cell: ({ row }) =>
    //         header.id === 'edit' || header.id === 'view' ? (
    //             <div className = 'table-button-container'>
    //           <button onClick={() => { passdata(row.original.id) }} className='pagination-button'>{header.id === 'edit' ? 'Edit' : 'View'}</button>
    //           <button onClick={() => { openView(row.original.id) }} className='pagination-button'>{header.id === 'edit' ? 'View' : 'Edit'}</button>
    //           <FontAwesomeIcon onClick={() => deletedata(row.original.id)} icon={faTrash} className='icon-button'/>
    //           </div>
    //           ) : (
    //           row.original[header.id]
    //         ),
    //     })),
    //   [headers]
    // );
    
    
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
        <button onClick={handleAddHeadOfFamilyClick}>+ Add Disaster Record </button>
        <br/>
          <div className='evacuation-table-itself'>
            <h1>Disaster Record</h1>
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