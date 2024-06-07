import CheckTable from "./components/CheckTable";
import React, { useState } from "react";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
  columnsDataVentasAnuales
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";

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
      <div className="grid grid-cols-1 gap-5 mt-5 h-full bg-blue-100 rounded-[5px] md:grid-cols-1">
        <ExcelCard
          columnsData={Vista}

          // tableData={tableDataColumns}
        />
     </div>
   

    </div>


  );
};

export default Tables;
