import React, { useMemo } from "react";
import Pasivos from "views/admin/balance/variables/tableDataPasivos.json";
import Activos from "views/admin/balance/variables/tableDataDevelopment.json";
import Estado from "views/admin/estado/variables/tableDataEstado.json";
import compras from "variables/Compras 2022.json"

const Razones = () => {
  const tableDataPasivos = Pasivos;
  const tableDataEstado = Estado;
  const tableDataActivos = Activos;
  const dataCompras = compras;

  let liquidezCorriente = 0;
  let razonRapida = 0;
  let rotInventario = 0;
  let periodoPromPago = 0;
  let rotActivosTotales = 0;
  let nivelDeEndeudamiento = 0;
  let concEndeudamientoCortoPlazo = 0;
  let margenUtilidadBruta = 0;
  let margenUtilidadOp = 0;
  let margenUtilidadNeta = 0;

  let pasivosCorrientes = 0;
  let activosCorrientes = 0;
  let inventario = 0;
  let costoBienesVendidos = 0;
  let cuentasPorCobrar = 0;
  let ventasAnuales = 0;
  let cuentasPorPagar = 0;
  let totalComprado = 0;
  let totalActivos = 0;
  let totalPasivos = 0;
  let utilidadOperativa = 0;
  let utilidadNeta = 0;

  //obtener valor de pasivos corrientes
  tableDataPasivos.forEach((item) => {
    if (item.name === "Pasivos corrientes") {
      pasivosCorrientes = parseFloat(item.date.replace(/[^0-9.-]/g, "")) 
    }else if (item.name === "Cuentas por pagar") {
      cuentasPorPagar = parseFloat(item.date.replace(/[^0-9.-]/g, "")) 
    }else if (item.name === "Pasivos Totales") {
      totalPasivos = parseFloat(item.date.replace(/[^0-9.-]/g, "")) 
    }
  });
  // si no encontro la cuenta pasivos corrientes usar cuentas por cobrar
  if (pasivosCorrientes === 0) {
    tableDataPasivos.forEach((item) => {
      if (item.name === "Cuentas por pagar") {
        pasivosCorrientes = parseFloat(item.date.replace(/[^0-9.-]/g, ""));
        totalPasivos = parseFloat(item.date.replace(/[^0-9.-]/g, ""));
      }
    });
  }
//Obtener valor del inventario y del activo corriente
  tableDataActivos.forEach((item) => {
    if (item.name === "Activos corrientes") {
      activosCorrientes = parseFloat(item.date.replace(/[^0-9.-]/g, ""))
    }else if (item.name === "Inventario") {
      inventario = parseFloat(item.date.replace(/[^0-9.-]/g, ""))
    }else if (item.name === "Activos Totales") {
      totalActivos = parseFloat(item.date.replace(/[^0-9.-]/g, ""))
    }

    
  });
//Costo de bienes vendidos
tableDataEstado.forEach((item) => {
  if (item.name === "Costo de los bienes vendidos") {
    costoBienesVendidos = parseFloat(item.date.replace(/[^0-9.-]/g, "")) 
  }else if(item.name === "Ingreso por ventas") {
    ventasAnuales = parseFloat(item.date.replace(/[^0-9.-]/g, ""))
  }else if(item.name === "Utilidad operativa") {
    utilidadOperativa = parseFloat(item.date.replace(/[^0-9.-]/g, ""))
  }else if(item.name === "Utilidad neta despues de impuestos") {
    utilidadNeta = parseFloat(item.date.replace(/[^0-9.-]/g, ""))
  }
});

dataCompras.forEach((item) => {
  if(item.Fecha === "2022"){
    totalComprado += item.Abono ;
  }
  if(item["Fecha de cancelación"] === "2022"){
    totalComprado += item.Cancelación;
  }
});
  
  
 

  liquidezCorriente = activosCorrientes / pasivosCorrientes;

  razonRapida = (activosCorrientes - inventario) /pasivosCorrientes;

  rotInventario = costoBienesVendidos / inventario;

  periodoPromPago = cuentasPorPagar / (totalComprado / 365);

  rotActivosTotales = ventasAnuales / totalActivos;

  nivelDeEndeudamiento = (totalPasivos / totalActivos) * 100;

  concEndeudamientoCortoPlazo = ( pasivosCorrientes / totalPasivos) * 100;

  margenUtilidadBruta = ((ventasAnuales - costoBienesVendidos) / ventasAnuales) * 100;  

  margenUtilidadOp = (utilidadOperativa / ventasAnuales) * 100;

  margenUtilidadNeta = (utilidadNeta / ventasAnuales) * 100;

  return (
    <div className="grid grid-cols-2  gap-8 mt-5 w-4/6 bg-white p-8  mx-auto mb-10 rounded-lg">
      <div className="flex items-center font-bold text-bold text-xl  col-span-2">
        <label className="block mb-2">Razones de Liquidez</label>
      </div>
      <div className="flex items-center text-xl ">
        <label className="block mb-2">Liquidez Corriente:</label>
      </div>
      <div className="flex items-center ">
        <label className="block mb-2 text-xl">{liquidezCorriente.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        }</label>
      </div >
      <div className="flex  items-center">
        <label className="block mb-2 text-xl">Razon Rápida:</label>

      </div>
      <div className="flex  items-center ">
        <label className="block mb-2 text-xl">{razonRapida.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        }
        </label>
      </div>

      <div className=" border-b   border-gray-400 col-span-2">
      </div>
      <div className="flex items-center font-bold text-bold text-xl  col-span-2">
        <label className="block mb-2">Índices de Actividad</label>
      </div>
      <div className="flex  items-center">
        <label className="block mb-2 text-xl">Rotación de Inventario:</label>

      </div>
      <div className="flex  items-center ">
        <label className="block mb-2 text-xl">{rotInventario.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        }
        </label>
      </div>

  

      <div className="flex  items-center">
        <label className="block mb-2 text-xl">Periodo promedio de pago:</label>

      </div>
      <div className="flex  items-center ">
        <label className="block mb-2 text-xl">{periodoPromPago.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        }
        </label>
      </div>

      <div className="flex  items-center">
        <label className="block mb-2 text-xl">Rotación de activos totales:</label>

      </div>
      <div className="flex  items-center ">
        <label className="block mb-2 text-xl">{rotActivosTotales.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        }

</label>
      </div>


      <div className=" border-b   border-gray-400 col-span-2">
      </div>
      <div className="flex items-center font-bold text-bold text-xl  col-span-2">
        <label className="block mb-2">Razones de endeudamiento</label>
      </div>
      <div className="flex  items-center">
        <label className="block mb-2 text-xl">Nivel de endeudamiento:</label>

      </div>
      <div className="flex  items-center ">
        <label className="block mb-2 text-xl">{nivelDeEndeudamiento.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        } %
        </label>
      </div>
      <div className="flex  items-center">
        <label className="block mb-2 text-xl">Concentración del endeudamiento a corto plazo:</label>

      </div>
      <div className="flex  items-center ">
        <label className="block mb-2 text-xl"> <br /> {concEndeudamientoCortoPlazo.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        } %
        </label>
      </div>


      <div className=" border-b   border-gray-400 col-span-2">
      </div>
      <div className="flex items-center font-bold text-bold text-xl  col-span-2">
        <label className="block mb-2">Índices de rendimiento</label>
      </div>
      <div className="flex  items-center">
        <label className="block mb-2 text-xl">Margen Bruto:</label>

      </div>
      <div className="flex  items-center ">
        <label className="block mb-2 text-xl">{margenUtilidadBruta.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        } % 
        </label>
      </div>
      <div className="flex  items-center">
        <label className="block mb-2 text-xl">Margen de utilidad operativa:</label>

      </div>
      <div className="flex  items-center ">
        <label className="block mb-2 text-xl">{margenUtilidadOp.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        } %</label>
      </div>

      <div className="flex  items-center">
        <label className="block mb-2 text-xl">Margen de utilidad neta:</label>

      </div>
      <div className="flex  items-center ">
        <label className="block mb-2 text-xl">{margenUtilidadNeta.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})
        } %</label>
      </div>



      <div className="  col-span-2">
      </div>

    </div>
  );
};

export default Razones;
