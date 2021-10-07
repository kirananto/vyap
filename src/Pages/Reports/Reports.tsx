import React from "react";
import { SimpleHeader } from "../../Components/Header";
import {ReportCard, EmptyReportCard} from "./ReportCard";
import shopImg from "../../assets/illustrations/Shop.svg"

export default function Reports() {
  return (
    <div className="bg-white dark:bg-gray-900 h-screen">
      {/* Header */}
      <div className="bg-white shadow">
        <SimpleHeader heading="Reports" />
      </div>

      {/* Card Container */}
      <div className="grid w-full grid-cols-2 gap-4 p-4 mt-2">
        <ReportCard
          heading="Shopwise Reports"
          bgIllus={shopImg}
        />
         <ReportCard
          heading="Shopwise Reports"
          bgIllus={shopImg}
        />
            <ReportCard
          heading="Shopwise Reports"
          bgIllus={shopImg}
        />
        <EmptyReportCard 
        heading="coming soon...!!"
        />
        
      </div>
    </div>
  );
}
