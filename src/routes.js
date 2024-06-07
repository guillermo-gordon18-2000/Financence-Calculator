import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Fileupload  from "views/admin/fileUpload";
import NFTMarketplace from "views/admin/marketplace";
//import Profile from "views/admin/profile";
import Balance from "views/admin/balance";
import Estado from "views/admin/estado";
import DataTables from "views/admin/tables";
import Razones from "views/admin/razones";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdAttachMoney,
  MdTrendingUp,
  MdBarChart,
  MdAccountBalance,
  MdCalculate,
  MdFileUpload
} from "react-icons/md";
import { MdMoneyOff } from "react-icons/md";

const routes = [
  {
    name: "Subir Archivo Excel",
    layout: "/admin",
    path: "fileUpload",
    icon: <MdFileUpload className="h-6 w-6" />,
    component: <Fileupload />,
  },
  {
    name: "Calculadora Financiera",
    layout: "/admin",
    path: "default",
    icon: <MdCalculate className="w-6 h-6" />,
    component: <MainDashboard />,
  },

  {
    name: "Balance General",
    layout: "/admin",
    path: "balance",
    icon: <MdAccountBalance className="w-6 h-6" />,
    component: <Balance />,
  },

  {
    name: "Estado de Resultados",
    layout: "/admin",
    path: "estado",
    icon: <MdTrendingUp className="w-6 h-6" />,
    component: <Estado />,
  },
  {
    name: "Razones Financieras",
    layout: "/admin",
    icon: <MdAttachMoney className="w-6 h-6" />,
    path: "razones",
    component: <Razones />,
  },
  /*{
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="w-6 h-6" />,
    path: "data-tables",
    component: <DataTables />,
  },*/
];
export default routes;
