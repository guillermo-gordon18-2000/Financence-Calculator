import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";

const PieChartCard = () => {
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold dark:text-white text-navy-700">
            Your Pie Chart
          </h4>
        </div>

        <div className="flex justify-center items-center mb-6">
          <select className="mb-3 flex items-center justify-center text-sm font-bold text-gray-600 me-2 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center items-center mb-auto w-full h-[220px]">
        <PieChart options={pieChartOptions} series={pieChartData} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="w-2 h-2 rounded-full bg-brand-500" />
            <p className="text-sm font-normal text-gray-600 ms-1">Your Files</p>
          </div>
          <p className="mt-px text-xl font-bold dark:text-white text-navy-700">
            63%
          </p>
        </div>

        <div className="w-px h-11 bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="text-sm font-normal text-gray-600 ms-1">System</p>
          </div>
          <p className="mt-px text-xl font-bold dark:text-white text-navy-700">
            25%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;
