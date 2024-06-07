
import React from 'react';
import * as XLSX from 'xlsx';

class ExcelToJsonConverter extends React.Component {
  handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} />
      </div>
    );
  }
}

export default ExcelToJsonConverter;

/*const ExcelCard = (props) => {
  const [tables, setTables] = useState([]);
  const [activeSheet, setActiveSheet] = useState("");
  const [column8Sum, setColumn8Sum] = useState(0);
  const [column8SumSelectedSheet, setColumn8SumSelectedSheet] = useState(0);
  const [column10SumSelectedSheet, setColumn10SumSelectedSheet] = useState(0);
  const [column7SumSelectedSheet, setColumn7SumSelectedSheet] = useState(0);
  const [RentabiliadNeta, setRentabilidadNeta] = useState(0);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const tableData = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const table = {
          sheetName,
          data: jsonData,
        };
        props.columnsData(table);
        tableData.push(table);
      });

      setTables(tableData);
      setActiveSheet(tableData[0]?.sheetName || "");

      // Calcular la suma de la columna 8
      let sum = 0;
      tableData.forEach((table) => {
        table.data.slice(1).forEach((row) => {
          const cellValue = parseFloat(row[6]); // Columna 8 (el índice es 7 ya que los índices comienzan desde 0)
          if (!isNaN(cellValue)) {
            sum += cellValue;
          }
        });
      });
      setColumn8Sum(sum);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSheetButtonClick = (sheetName) => {
    setActiveSheet(sheetName);
    const selectedTable = tables.find((table) => table.sheetName === sheetName);
    if (selectedTable) {
      let sumColumn8 = 0;
      let sumColumn10 = 0;
      let sumColumn7 = 0; // Nueva variable para la suma de la columna 7 en la hoja "Compras 2022"

      selectedTable.data.slice(1).forEach((row) => {
        const cellValueColumn8 = parseFloat(row[7]); // Columna 8 (el índice es 7 ya que los índices comienzan desde 0)
        const cellValueColumn10 = parseFloat(row[9]); // Columna 10 (el índice es 9)

        if (!isNaN(cellValueColumn8)) {
          sumColumn8 += cellValueColumn8;
        }
        if (!isNaN(cellValueColumn10)) {
          sumColumn10 += cellValueColumn10;
        }
      });

      // Buscar la hoja "Compras 2022" y sumar los valores de la columna 4
      const compras2022Table = tables.find(
        (table) => table.sheetName === "Compras 2022"
      );
      if (compras2022Table) {
        compras2022Table.data.slice(1).forEach((row) => {
          const cellValueColumn4 = parseFloat(row[4]); // Columna 4 (el índice es 3)
          if (!isNaN(cellValueColumn4)) {
            sumColumn7 += cellValueColumn4;
          }
        });
      }

      setColumn8SumSelectedSheet(sumColumn8);
      setColumn10SumSelectedSheet(sumColumn10);
      setColumn7SumSelectedSheet(sumColumn7); // Agregar la suma de la columna 4 en "Compras 2022" a la variable de estado

      setRentabilidadNeta(sumColumn8 + sumColumn10);
    }
  };
  return (
    <div className="card">
      <div className="card-header">Importar archivo Excel</div>
      <div className="card-body">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        {tables.map((table, index) => (
          <div key={index}>
            <button
              className={activeSheet === table.sheetName ? "active " : ""}
              onClick={() => handleSheetButtonClick(table.sheetName)}
            >
              {table.sheetName}
            </button>
          </div>
        ))}
        {tables.map((table, index) => (
          <div
            key={index}
            style={{
              display: activeSheet === table.sheetName ? "block" : "none",
            }}
          >
            <h3>Suma de la columna 8: {column8Sum}</h3>
            {activeSheet && (
              <h3>
                Suma de la columna 8 (hoja {activeSheet}):{" "}
                {column8SumSelectedSheet}
              </h3>
            )}
            {activeSheet && (
              <h3>
                Suma de la columna 10 (hoja {activeSheet}):{" "}
                {column10SumSelectedSheet}
              </h3>
            )}
            {activeSheet && (
              <h3>
                Suma de la columna 7 (hoja {activeSheet}):{" "}
                {column7SumSelectedSheet}
              </h3>
            )}
            <h3>{table.sheetName}</h3>
            <table className="table">
              <thead>
                <tr>
                  {table.data[0].map((header, headerIndex) => (
                    <th key={headerIndex}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.data.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      const cellValue = cell || ""; // Verificar si la celda es nula o indefinida
                      return <td key={cellIndex}>{cellValue}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
}; 

export default ExcelCard;*/
//
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
//
// const ExcelCard = ({ onJsonData }) => {
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//
//       const tableData = [];
//
//       workbook.SheetNames.forEach((sheetName) => {
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//
//         const formattedData = jsonData.map((row) => {
//           const formattedRow = row.map((cell, index) => {
//             if (index === COLUMN_INDEX_TO_FORMAT && typeof cell === "number" && cell > 1) {
//               const excelDateSerial = Math.floor(cell);
//               const baseDate = new Date(Date.UTC(1899, 11, 30));
//               const date = new Date(baseDate.getTime() + (excelDateSerial - 1) * 24 * 60 * 60 * 1000);
//               return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//             } else {
//               return cell || "";
//             }
//           });
//           return formattedRow;
//         });
//
//         const table = {
//           sheetName,
//           data: formattedData,
//         };
//
//         tableData.push(table);
//       });
//
//       onJsonData(tableData);
//     };
//
//     reader.readAsArrayBuffer(file);
//   };
//
//   return (
//     <div className="card">
//       <div className="card-header">Importar archivo Excel</div>
//       <div className="card-body">
//         <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
//       </div>
//     </div>
//   );
// };
//
// export default ExcelCard;
//
