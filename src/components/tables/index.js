import React, { useState } from "react";
import styled from "styled-components";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import makeData from "./makeData";
import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  NumberRangeColumnFilter,
  SliderColumnFilter,
  fuzzyTextFilterFn,
} from "./filters";
import TablePagination from "./pagination";
// import "bootstrap/dist/css/bootstrap.min.css";
import BTable from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Actions from "./actions";
import TableHeaderComponent from "./containers/header";
import TableBodyComponent from "./containers/body";

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid lightgrey;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

// Define a default UI for filtering

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({ columns, data, actions, type }) {
  const [borderColor, setBorderColor] = useState("#808080");
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,

    //for pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: {
        pageIndex: 0,
        pageSize: 5,
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
        }),
      },
    },

    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination // Pagination
  );

  return (
    <>
      <BTable responsive hover size="sm" {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length + 3}
              id="table-global-filter"
              style={{
                textAlign: "left",
                border: `1px solid ${borderColor}`,
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
                onFocus={() => {
                  setBorderColor("red");
                }}
                onBlur={() => {
                  setBorderColor("#808080");
                }}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <TableHeaderComponent headerGroup={headerGroup} actions={actions} />
          ))}
        </thead>
        <TableBodyComponent
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          type={type}
          actions={actions}
        />
      </BTable>
      <br />
      <TablePagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageCount={pageCount}
        pageOptions={pageOptions}
      />
    </>
  );
}

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

const CustomTable = ({ columns = [], data = [], actions, type }) => {
  return (
    <Styles>
      <Table columns={columns} data={data} actions={actions} type={type} />
    </Styles>
  );
};

export default CustomTable;

// const columns = React.useMemo(
//   () => [
//     {
//       Header: "Name",
//       columns: [
//         {
//           Header: "First Name",
//           accessor: "firstName",
//         },
//         {
//           Header: "Last Name",
//           accessor: "lastName",
//           // Use our custom `fuzzyText` filter on this column
//           filter: "fuzzyText",
//         },
//       ],
//     },
//     {
//       Header: "Info",
//       columns: [
//         {
//           Header: "Age",
//           accessor: "age",
//           Filter: SliderColumnFilter,
//           filter: "equals",
//         },
//         {
//           Header: "Visits",
//           accessor: "visits",
//           Filter: NumberRangeColumnFilter,
//           filter: "between",
//         },
//         {
//           Header: "Status",
//           accessor: "status",
//           Filter: SelectColumnFilter,
//           filter: "includes",
//         },
//         {
//           Header: "Profile Progress",
//           accessor: "progress",
//           Filter: SliderColumnFilter,
//           filter: filterGreaterThan,
//         },
//       ],
//     },
//   ],
//   []
// );

// const data = React.useMemo(() => makeData(100000), []);
