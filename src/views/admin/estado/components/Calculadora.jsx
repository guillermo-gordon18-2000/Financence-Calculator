import React, { useState } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [paidPeriods, setPaidPeriods] = useState('');

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const interest = (parseFloat(interestRate) / 100) /12;
    const period = parseInt(loanPeriod);
    const paidPeriod = parseInt(paidPeriods);

	
	const Totalapagar = (principal * Math.pow(1 + interest, period))/10;
    const monthlyPayment = principal * ( ( (interest * Math.pow(1 + interest, period))/10) / ((Math.pow(1 + interest, period)-1)));
	const totalPayed = monthlyPayment * ((Math.pow(1 + interest, paidPeriod)-1) / interest);	

    const remainingPayment = ((principal * Math.pow(1 + interest, paidPeriod))/10) - totalPayed;

	console.log('Total a pagar:', Totalapagar.toFixed(2));
	console.log('Pago mensual:', monthlyPayment.toFixed(2));
	console.log('Pagado a la fecha:', totalPayed.toFixed(2));
	console.log('Deuda actual:', remainingPayment.toFixed(2));

  };

  return (
    <div>
      <h2>Calculadora de Préstamos</h2>
      <div>
        <label>Monto del préstamo:</label>
        <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
      </div>
      <div>
        <label>Tasa de interés (%):</label>
        <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
      </div>
      <div>
        <label>Período del préstamo (meses):</label>
        <input type="number" value={loanPeriod} onChange={(e) => setLoanPeriod(e.target.value)} />
      </div>
      <div>
        <label>Período pagado (meses):</label>
        <input type="number" value={paidPeriods} onChange={(e) => setPaidPeriods(e.target.value)} />
      </div>
      <button onClick={calculateLoan}>Calcular</button>
    </div>
  );
};

export default LoanCalculator;