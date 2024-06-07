import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

/* Cálculos del Excel - Word para las fórmulas */
let tomarLiquidez = false;
const razonLiquidezCorriente = [];
let tomarRapida = false;
const razonRapida = [];
let calculoDeFormulas = [];

const DevelopmentCalculo = (razon1, razon2) => {
  calculoDeFormulas = [
    {
      key: "Razón de Liquidez Corriente",
      value: (Math.ceil((razon1[0] / razon1[1]) * 100) / 100).toFixed(2),
    },
    {
      "key": "Razón Rápida",
      "value": ((Math.ceil((razon2[1]-razon2[0])/razon2[3] * 100) / 100).toFixed(2))
    },
    {
      "key": "Ratio de Endeudamiento",
      "value": ((Math.ceil(razon1[1]/(razon1[0]-razon1[1]) * 100) / 100).toFixed(2))
    },
    {
      "key": "Tasa de Rotación de Inventario",
      "value": ((Math.round(razon2[4]/razon2[2] * 100) / 100).toFixed(2))
    }
  ]

  return (
    <div className="calculoDeFormulas">
      <h1>Cálculo de Razones</h1>
      <div>
        <h3>RAZÓN</h3>
        <h3>VALOR</h3>
      </div>
      <div>
        {calculoDeFormulas.map((row, index) => {
          return (
            <div key={index}>
              <p>{row.key}</p>
              <p>{row.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// <div className="calculoDeFormulas">
//   <h3>Razón de Liquidez Corriente: {(Math.ceil(razonLiquidezCorriente[0]/razonLiquidezCorriente[1] * 100) / 100).toFixed(2)}</h3>
//   <h3>Razón Rápida: {(Math.ceil((razonRapida[1]-razonRapida[0])/razonRapida[2] * 100) / 100).toFixed(2)}</h3>
// </div>

const ExcelCard = (props) => {
  const [excelData, setExcelData] = useState(null);
  const [tables, setTables] = useState([]);
  const [activeSheet, setActiveSheet] = useState("BalanceGeneral2022");
  const [column8Sum, setColumn8Sum] = useState(0);
  const [column8SumSelectedSheet, setColumn8SumSelectedSheet] = useState(0);
  const [column10SumSelectedSheet, setColumn10SumSelectedSheet] = useState(0);
  const [column7SumSelectedSheet, setColumn7SumSelectedSheet] = useState(0);
  const [RentabilidadNeta, setRentabilidadNeta] = useState(0);
  const saveExcelDataToLocalStorage = (data) => {
    localStorage.setItem("excelData", JSON.stringify(data));
  };
  const loadExcelDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  };
  useEffect(() => {
    const loadedExcelData = loadExcelDataFromLocalStorage();
    if (loadedExcelData) {
      setExcelData(loadedExcelData);
      setTables(loadedExcelData);
      setActiveSheet(loadedExcelData[0]?.sheetName || "");
    }
  }, []);
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
      setExcelData(tableData);
      setActiveSheet(tableData[0]?.sheetName || "");

      saveExcelDataToLocalStorage(tableData);

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
      let sumColumn7 = 0;

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
      setColumn7SumSelectedSheet(sumColumn7);
      setRentabilidadNeta(sumColumn8 + sumColumn10);
    }
  };

  return (
    <>
      <div className="p-4 bg-white rounded shadow">
        <div className="mb-4 text-lg font-semibold">Importar archivo Excel</div>
        <div>
          <input
            type="file"
            accept=".xlsx, .xls"
            className="py-2 px-4 rounded border"
            onChange={handleFileChange}
          />
        </div>
        <div className="categorias">
          {tables.map((table, index) => (
            <button
              key={index}
              className={`${activeSheet === table.sheetName ? "btnActivo" : "btnInactivo"
                } rounded py-2 px-4`}
              onClick={() => handleSheetButtonClick(table.sheetName)}
            >
              {table.sheetName}
            </button>
          ))}
        </div>
        {tables.map((table, index) => (
          <div
            key={index}
            className={`${activeSheet === table.sheetName ? "block" : "hidden"
              } relative mt-4`}
          >
            {/* <h3 className="text-lg font-semibold">
            Suma de la columna 8: {Math.ceil(column8Sum * 100) / 100}
          </h3>
          {activeSheet && (
            <h3 className="text-lg font-semibold">
              Suma de la columna 8 (hoja {activeSheet}):{" "}
              {Math.ceil(column8SumSelectedSheet * 100) / 100}
            </h3>
          )}
          {activeSheet && (
            <h3 className="text-lg font-semibold">
              Suma de la columna 10 (hoja {activeSheet}):{" "}
              {Math.ceil(column10SumSelectedSheet * 100) / 100}
            </h3>
          )}
          {activeSheet && (
            <h3 className="text-lg font-semibold">
              Suma de la columna 7 (hoja {activeSheet}):{" "}
              {Math.ceil(column7SumSelectedSheet * 100) / 100}
            </h3>
          )} */}
            <h3 className="hidden text-lg font-semibold namePage">
              {table.sheetName}
            </h3>
            <table className="table hidden pTable">
              <thead>
                <tr>
                  {table.data[0].map((header, headerIndex) => (
                    <th key={headerIndex}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.data.slice(1).map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 == 0 ? "filaPar" : `filaImpar`}
                  >
                    {row.map((cell, cellIndex) => {
                      let cellValue = cell || ""; // Verificar si la celda es nula o indefinida

                      /* Redondear números a 2 decimales */
                      try {
                        if (typeof cellValue === "number") {
                          cellValue = Math.ceil(cellValue * 100) / 100;
                        }
                      } catch (err) { }

                      /* Obtener datos del Activo Corriente y Pasivo Corriente */
                      tomarLiquidez && razonLiquidezCorriente.push(cellValue);

                      try {
                        if (
                          cellValue.trim() == "activos corrientes" ||
                          cellValue.trim() == "pasivos corrientes"
                        ) {
                          tomarLiquidez = true;
                        } else {
                          tomarLiquidez = false;
                        }
                      } catch (err) {
                        tomarLiquidez = false;
                      }

                      /* Obtener datos del Activo Corriente, Pasivo Corriente e Inventario */
                      tomarRapida && razonRapida.push(cellValue);

                      try {
                        if (
                          cellValue.trim() == "activos corrientes" ||
                          cellValue.trim() == "activos totales" ||
                          cellValue.trim() == "pasivos corrientes" ||
                          cellValue.trim() == "inventario" ||
                          cellValue.trim() == "ventas totales"
                        ) {
                          tomarRapida = true;
                        } else {
                          tomarRapida = false;
                        }
                      } catch (err) {
                        tomarRapida = false;
                      }

                      return <td key={cellIndex}>{cellValue}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            {table.sheetName == "Razones Financieras" &&
              DevelopmentCalculo(razonLiquidezCorriente, razonRapida)}
          </div>
        ))}
      </div>
    </>
  );
};

export default ExcelCard;
