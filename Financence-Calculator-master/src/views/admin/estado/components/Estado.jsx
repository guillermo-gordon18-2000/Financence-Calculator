import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { DiApple } from "react-icons/di";
import { DiAndroid } from "react-icons/di";
import { DiWindows } from "react-icons/di";

import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Progress from "components/progress";

const Activos = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  return (
    <Card extra={"w-[75%] h-full p-4 mx-auto"}>
      <div className="flex relative justify-between items-center">
        <div className="text-xl font-bold dark:text-white text-navy-700">
          Estado de resultados
        </div>
      </div>

      <div class="overflow-x-scroll mx-10 h-full xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="mt-8 w-full h-max"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pr-32 pb-[10px] text-start dark:!border-navy-700 "
                    key={index}
                  >
                    <div className="font-bold tracking-wide text-gray-600 text-m">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "CUENTA") {
                      data = (
                        <p className="text-sm font-bold dark:text-white text-navy-700">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "AÑO 2022") {
                      data = (
                        <p className="text-sm font-bold dark:text-white text-navy-700">
                          <b className="ml-3 text-sm font-bold dark:text-white text-navy-700">
                            {cell.value}
                          </b>
                        </p>
                      );
                    } else if (cell.column.Header === "PORCENTAJE") {
                      data = (
                        <div className="flex gap-3 items-center">
                          <p className="text-sm font-bold dark:text-white text-navy-700">
                            {cell.value}%
                          </p>
                          <Progress width="w-[68px]" value={cell.value} />
                        </div>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pb-3 pt-[14px] text-[14px]"
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Activos;
