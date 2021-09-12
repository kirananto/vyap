import React from "react";
import { SimpleHeader } from "../../Components/Header";
import EmployeesCard from "./EmployeesCard";

export default function Employees() {
  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-100">
      <div className="w-full mb-2 bg-white shadow">
        <SimpleHeader heading=" Employees " />
      </div>
      {/* Caard Container  */}
      <div className="flex flex-col items-center w-full gap-4 py-2 ">
        <EmployeesCard name="Manoharan Pilla" orderTaker="+915620454465" />
        <EmployeesCard name="Manoharan Pilla" orderTaker="+915620454465" />
        <EmployeesCard name="Manoharan Pilla" orderTaker="+915620454465" />
        <EmployeesCard name="Manoharan Pilla" orderTaker="+915620454465" />
        <EmployeesCard name="Manoharan Pilla" orderTaker="+915620454465" />
        <EmployeesCard name="Manoharan Pilla" orderTaker="+915620454465" />
      </div>

      {/* Footer */}

      <div className="fixed bottom-0 flex items-center justify-center w-full h-16 bg-white shadow">
          <button className="w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">Invite a new employee</button>
      </div>
    </div>
  );
}
