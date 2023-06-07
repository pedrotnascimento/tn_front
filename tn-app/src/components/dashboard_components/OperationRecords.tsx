import { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "bootstrap-4-react";
import axios from "axios";

export function OperationRecords() {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("");

    useEffect(() => {
        fetchData(pageIndex, pageSize, sortField, sortDirection);
    }, []);

    const fetchData = async (pageIndex, pageSize, sortField, sortDirection) => {
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
                    sortField: sortField,
                    sortDirection: sortDirection
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
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <Button danger onClick={() => excludeRegistry(row.original)}>DELETE</Button>
                ),
            },
        ],
        []
    );

    const excludeRegistry = (row) => {

        const url = 'http://127.0.0.1:5000/v1/records/' + row.id;
        const token = localStorage.getItem("token");
        axios.delete(url, {
            headers: {
                Authorization: token
            },
        }).then(() => {
            fetchData(pageIndex, pageSize, sortField, sortDirection);
        }).catch(() => {
            console.error("Error on delete");
        });

    };

    const handlePageChange = (pageIndex) => {
        gotoPage(pageIndex);
        fetchData(pageIndex, pageSize, sortField, sortDirection);
    };
    
    const handlePageSize = (pageSize) => {
        setPageSize(Number(pageSize));
        fetchData(pageIndex, pageSize, sortField, sortDirection);
    };
    const handleSort = (column) => {
        console.log(column);
        if (column.isSorted) {
            if (column.isSortedDesc) {
                handleSortDesc(column);
            }
            else {
                handleSortAsc(column);
            }
        }
    };
    const handleSortDesc = (column) => {
        setSortField(column.id);
        setSortDirection("desc");
        fetchData(pageIndex, pageSize, column.id, "desc");
        return ' 🔼';
    };

    function handleSortAsc(column) {
        setSortField(column.id);
        setSortDirection("asc");
        fetchData(pageIndex, pageSize, column.id, "asc");
        return ' 🔽';
    }

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
            initialState: { pageIndex: 0, pageSize: 3, sortBy: [], sortOrder: '' },
            manualPagination: true,
            manualSortBy: true,
            onSortingChange: handleSort,
            pageCount,
        },
        useSortBy,
        usePagination
    );



    return (
        <div>
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>

                                </th>
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

                <Button onClick={() => handlePageChange(pageIndex - 1)} disabled={!canPreviousPage}>
                    {'<'}
                </Button>
                <Button onClick={() => handlePageChange(pageIndex + 1)} disabled={!canNextPage}>
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
                        handlePageSize(e.target.value)}}
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
