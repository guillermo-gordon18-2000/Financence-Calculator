import BarChart from "components/charts/BarChart";
import { barChartDataDailyTraffic } from "variables/charts";
import { barChartOptionsDailyTraffic } from "variables/charts";
import { MdArrowDropUp } from "react-icons/md";
import Card from "components/card";
const DailyTraffic = () => {
  return (
    <Card extra="bg-gray-300   pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="pt-2 ml-1">
          <p className="text-sm font-medium leading-4 text-gray-600">
            Daily Traffic
          </p>
          <p className="font-bold dark:text-white text-[34px] text-navy-700">
            2.579{" "}
            <span className="text-sm font-medium leading-6 text-gray-600">
              Visitors
            </span>
          </p>
        </div>
        <div className="flex items-start mt-2">
          <div className="flex items-center text-sm text-green-500">
            <MdArrowDropUp className="w-5 h-5" />
            <p className="font-bold"> +2.45% </p>
          </div>
        </div>
      </div>

      <div className="pt-10 pb-0 w-full h-[300px]">
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </div>
    </Card>
  );
};

export default DailyTraffic;
