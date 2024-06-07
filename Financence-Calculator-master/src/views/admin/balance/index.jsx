
import React, { useState } from "react";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
  columnsDataVentasAnuales,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataPasivos from "./variables/tableDataPasivos.json";

import Activos from "./components/Activos";
import Pasivos from "./components/Pasivos";
import Calculadora from "./components/Calculadora";

import ExcelCard from "./components/ExelCard";
const Tables = () => {
  const [tables, setTables] = useState([]);
  const Vista = (vista_A) => {
    console.log(vista_A);
    console.log(columnsDataDevelopment);

    console.log(tableDataDevelopment);
    setTables(vista_A);

    // props.VistaPrevia(vista_A, vista_B, Producto, text);
  };

  return (
    <div>
      {/*<div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ExcelCard
          columnsData={Vista}

          // tableData={tableDataColumns}
        />
  </div>*/}

      <div className="grid grid-cols-1 gap-5 mt-5 h-full md:grid-cols-1">
        <Activos
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5 h-full md:grid-cols-1">
        <Pasivos
          columnsData={columnsDataDevelopment}
          tableData={tableDataPasivos}
        />
      </div>















x
      {/*<div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 bg-red-200 md:grid-cols-2">
        <ColumnsTable
          columnsData={columnsDataVentasAnuales}
          tableData={tableDataColumns}
        />

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
         />
      </div>*/}
    </div>
  );
};

export default Tables;
