import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchRegistrationList } from '../../../firebase/function'
import React from 'react'
import { registrationdata } from '../../../types/interfaces'
import { useTable, usePagination, useSortBy, useGlobalFilter, Column } from 'react-table';
import '../registration/registration.css'

const headers = [
  {name: 'Disaster', id: 'disaster'},
  {name: 'Action', id: 'action'},
]

export default function DisasterTable() {

    const [tabledata, settabledata] = React.useState<registrationdata[]>([])

    React.useEffect(() => {
        const getRegistration = async( ) => {
            const result: registrationdata[] = await fetchRegistrationList() || []
            settabledata(result)
        }
        getRegistration()
    },[])

    const columns: Column<any>[] = React.useMemo(
      () =>
        headers.map((header) => ({
          Header: header.name,
          accessor: header.id,
          disableSortBy: header.id === 'action',
          Cell: ({ row }) =>
            header.id === 'action' ? (
              <button>{header.name}</button>
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
    <div className="table">
        <br/>
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
  )
}