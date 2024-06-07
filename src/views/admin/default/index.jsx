import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";


import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

import Calculadora from "./components/Calculadora";

const Dashboard = () => {
  return (

    <div>
      {/* Card widget */}
      <div className="">
        <Calculadora
        />
      </div>

     
      
      {/* Charts */}
    {/*
      <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      <div className="grid grid-cols-1 gap-5 mt-5 xl:grid-cols-2">
  
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>


        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 rounded-[20px]">
          <DailyTraffic />
          <PieChartCard />
        </div>

      

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 rounded-[20px]">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div> */}
    </div>
  );
};

export default Dashboard;
