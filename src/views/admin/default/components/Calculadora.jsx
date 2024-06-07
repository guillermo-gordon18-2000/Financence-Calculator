import React, { useState, useEffect } from 'react';
import Widget from "components/widget/Widget";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Pasivos from "views/admin/balance/variables/tableDataPasivos.json";
import Activos from "views/admin/balance/variables/tableDataDevelopment.json";
import { parse } from 'postcss';
const LoanCalculator = () => {
	const [loanAmount, setLoanAmount] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [loanPeriod, setLoanPeriod] = useState('');
	const [paidPeriods, setPaidPeriods] = useState('');
	
	const tableDataPasivos = Pasivos;
	const tableDataActivos = Activos;


	const [showWidget, setShowWidget] = useState(false);

	const [calculatedValues, setCalculatedValues] = useState({
		Totalapagar: 0,
		monthlyPayment: 0,
		totalPayed: 0,
		remainingPayment: 0,
		pagosFaltantes: 0,
		interest: 0
	});

	const calculateLoan = () => {
		const principal = parseFloat(loanAmount);
		const interest = (parseFloat(interestRate) / 100) / 12;
		const period = parseInt(loanPeriod);
		const paidPeriod = parseInt(paidPeriods);


		const Totalapagar = principal * Math.pow(1 + interest, period);

		const monthlyPayment = (principal * interest * Math.pow(1 + interest, period)) /
			(Math.pow(1 + interest, period) - 1);

		const totalPayed = monthlyPayment * ((Math.pow(1 + interest, paidPeriod) - 1) / interest);

		const remainingPayment = principal * Math.pow(1 + interest, paidPeriod) - totalPayed;

		const pagosFaltantes = period - paidPeriod;

		setCalculatedValues({
			Totalapagar,
			monthlyPayment,
			totalPayed,
			remainingPayment,
			pagosFaltantes,
			interest
		});

		setShowWidget(true);

		
		

	};
	useEffect(() => {
		let cuentasPorPagar = 0;
		let totalActivos = 0;
		let deudaLargoPlazo =0;
	let deudaCortoPlazo = 0;

		tableDataPasivos.forEach((item) => {
			if (item.name === "Cuentas por pagar") {
				cuentasPorPagar =  parseFloat(item.date.replace(/[^0-9.-]/g, ""))
			}
		});

		tableDataActivos.forEach((item) => {
			if (item.name === "Activos Totales") {
				totalActivos = parseFloat(item.date.replace(/[^0-9.-]/g, ""))
			}
		});
		
		console.log("Activos: ",(totalActivos))
		console.log("Por pagar",cuentasPorPagar)
		
		
	if (calculatedValues.pagosFaltantes <= 12) {
		 deudaCortoPlazo = calculatedValues.monthlyPayment * ((Math.pow(1 + calculatedValues.interest, calculatedValues.pagosFaltantes) - 1) / calculatedValues.interest);
		 deudaLargoPlazo = 0;
		 console.log(deudaLargoPlazo);
		const jsonData = [
			{
				name: "Prestamo bancario",
				date: deudaCortoPlazo.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				}),
			},
			{
				name: "Cuentas por pagar",
				date: cuentasPorPagar.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				}),
			},
			{
				name: "Pasivos corrientes",
				date: (deudaCortoPlazo + cuentasPorPagar).toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				}),
			},
			{
				name: "Deuda a largo plazo",
				date: deudaLargoPlazo.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				}),
			},
			{
				name: "Pasivos Totales",
				date: (deudaLargoPlazo + cuentasPorPagar + deudaCortoPlazo).toLocaleString(
					"eng-US",
					{
						style: "decimal",
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					}
				),
			},
			{
				name: "Patrimonio neto",
				date: (totalActivos - (deudaLargoPlazo + cuentasPorPagar + deudaCortoPlazo)).toLocaleString(
					"eng-US",
					{
						style: "decimal",
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					}
				),
			},
		];

		if(showWidget){
			fetch('http://localhost:3001/api/OverwritePasivos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonData)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data.message);
			})
			.catch(error => {
				console.error('Error al enviar los datos al servidor:', error);
			});
		}
	} else {
		 deudaCortoPlazo = calculatedValues.monthlyPayment * ((Math.pow(1 + calculatedValues.interest, 12) - 1) / calculatedValues.interest);
		 deudaLargoPlazo = calculatedValues.monthlyPayment * ((Math.pow(1 + calculatedValues.interest, (calculatedValues.pagosFaltantes - 12)) - 1) / (calculatedValues.interest * Math.pow(1 + calculatedValues.interest, (calculatedValues.pagosFaltantes - 12))));

		console.log ("monthlyPayment ", calculatedValues.monthlyPayment)
		console.log ("pagosFaltantes ", calculatedValues.pagosFaltantes)
		console.log ("interests ", calculatedValues.interest);
		console.log ("deudacorto plazoo", deudaCortoPlazo); 
		console.log("deudaLargo plazo", deudaLargoPlazo);
		const jsonData = [
			{
				name: "Prestamo bancario",
				date: deudaCortoPlazo.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				}),
			},
			{
				name: "Cuentas por pagar",
				date: cuentasPorPagar.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				}),
			},
			{
				name: "Pasivos corrientes",
				date: (deudaCortoPlazo + cuentasPorPagar).toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				}),
			},
			{
				name: "Deuda a largo plazo",
				date: deudaLargoPlazo.toLocaleString("eng-US", {
					style: "decimal",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				}),
			},
			{
				name: "Pasivos Totales",
				date: (deudaLargoPlazo + cuentasPorPagar + deudaCortoPlazo).toLocaleString(
					"eng-US",
					{
						style: "decimal",
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					}
				),
			},
			{
				name: "Patrimonio neto",
				date: (totalActivos - (deudaLargoPlazo + cuentasPorPagar + deudaCortoPlazo)).toLocaleString(
					"eng-US",
					{
						style: "decimal",
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					}
				),
			},
		];

		if(showWidget){
			fetch('http://localhost:3001/api/OverwritePasivos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonData)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data.message);
			})
			.catch(error => {
				console.error('Error al enviar los datos al servidor:', error);
			});
		}
	}

	}, [calculatedValues.pagosFaltantes])
	
	

	return (
		<div>

			<div className="grid grid-cols-2 gap-8 mt-5 w-4/6 bg-white p-8  mx-auto mb-10 rounded-lg">
				<div className="flex justify-center items-center">
					<label className="block mb-2">Monto del préstamo:</label>
					<input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-1/2 p-2 ml-2 border-2 border-blue-900 " />
				</div>
				<div className="flex justify-center items-center">
					<label className="block mb-2">Tasa de interés anual (%):</label>
					<input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-1/2 p-2 ml-2 border-2 border-blue-900  " />
				</div>
				<div className="flex justify-center items-center">
					<label className="block mb-2">Período del préstamo (meses):</label>
					<input type="number" value={loanPeriod} onChange={(e) => setLoanPeriod(e.target.value)} className="w-1/2 p-2 ml-2 border-2 border-blue-900  " />
				</div>
				<div className="flex justify-center items-center">
					<label className="block mb-2">Período pagado (meses):</label>
					<input type="number" value={paidPeriods} onChange={(e) => setPaidPeriods(e.target.value)} className="w-1/2 p-2 ml-2 border-2 border-blue-900  s" />
				</div>
				<button onClick={calculateLoan} className="bg-blue-500 text-white px-4 py-2 mx-auto px-20 col-span-2">Calcular</button>
			</div>

			{showWidget && (
				<div className="grid grid-cols-1 gap-5 mt- md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 w-full 3xl:grid-cols-6">
					<Widget
						icon={<MdBarChart className="w-7 h-7" />}
						title={"Total a Pagar"}
						subtitle={calculatedValues.Totalapagar.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					/>
					<Widget
						icon={<IoDocuments className="w-6 h-6" />}
						title={"Pago Mensual"}
						subtitle={calculatedValues.monthlyPayment.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					/>
					<Widget
						icon={<MdBarChart className="w-7 h-7" />}
						title={"Pagado a la fecha"}
						subtitle={calculatedValues.totalPayed.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					/>
					<Widget
						icon={<MdDashboard className="w-6 h-6" />}
						title={"Deuda Actual"}
						subtitle={calculatedValues.remainingPayment.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					/>
					<Widget
						icon={<MdBarChart className="w-7 h-7" />}
						title={"Pagos Faltantes"}
						subtitle={calculatedValues.pagosFaltantes}
					/>
				</div>
			)};




		</div>
	);
};

export default LoanCalculator;
