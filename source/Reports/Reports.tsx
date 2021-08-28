import React from "react";
import { SimpleHeader } from "../Components/Header";
import {ReportCard, EmptyReportCard} from "./ReportCard";

export default function Reports() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-white shadow">
        <SimpleHeader heading="Reports" />
      </div>

      {/* Card Container */}
      <div className="grid w-full grid-cols-2 gap-4 p-4 mt-2 bg-white">
        <ReportCard
          heading="Shopwise Reports"
          bgIllus="../assets/illustrations/Shop.svg"
        />
         <ReportCard
          heading="Shopwise Reports"
          bgIllus="../assets/illustrations/Shop.svg"
        />
            <ReportCard
          heading="Shopwise Reports"
          bgIllus="../assets/illustrations/Shop.svg"
        />
        <EmptyReportCard 
        heading="More coming soon...!!"
        />
        
      </div>
    </div>
  );
}
