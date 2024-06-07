import React, { useState } from "react";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
  columnsDataVentasAnuales,
} from "./variables/columnsData";

import tableDataEstado from "./variables/tableDataEstado.json";
import Estado from "./components/Estado";


import ExcelCard from "./components/ExelCard";

const Tables = () => {
  const [columns8, setcolum8] = useState("");
  const [tables, setTables] = useState([]);


  return (
    <div>
      
      <div className="grid grid-cols-1 gap-5 mt-5 h-full md:grid-cols-1">
        <Estado
          columnsData={columnsDataDevelopment}
          tableData={tableDataEstado}
        />
      </div>
      
    </div>
  );
};

export default Tables;
