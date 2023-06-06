import { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "bootstrap-4-react";
import axios from "axios";

export function OperationRecords() {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    
    useEffect(() => {
        
        fetchData(pageIndex);
    }, []);

    const fetchOperations = async ()=>{

            
        const url = 'http://127.0.0.1:5000/v1/operations';
        const token = localStorage.getItem("token");
        const response = await axios.get(url, {
            headers: {
                Authorization: token
            },
            params: {
                page: pageIndex + 1,
                perPage: pageSize,
            },
        });
        return response.data;
    }

    const fetchData = async (pageIndex) => {
        try {
            
            
            const url = 'http://127.0.0.1:5000/v1/records';
            const token = localStorage.getItem("token");
            const response = await axios.get(url, {
                headers: {
                    Authorization: token
                },
                params: {
                    page: pageIndex + 1,
                    perPage: pageSize,
                },
            });
            
            setData(response.data.data);
            setPageCount(response.data.pages);
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    };

    const columns = useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Operation', accessor: 'operationType' },
            { Header: 'Response', accessor: 'operationResponse' },
            { Header: 'UserBalance', accessor: 'userBalance' },
        ],
        []
    );

    const handlePageChange = (pageIndex) => {
        gotoPage(pageIndex);
        fetchData(pageIndex);
      };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 3 },
            manualPagination: true, // Enable manual pagination
            pageCount,
        },
        usePagination
    );


    return (
        <div>
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">

                <Button onClick={() =>  handlePageChange(pageIndex-1)} disabled={!canPreviousPage}>
                    {'<'}
                </Button>
                <Button onClick={() =>   handlePageChange(pageIndex+1)} disabled={!canNextPage}>
                    {'>'}
                </Button>

                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>

                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[3, 10, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
