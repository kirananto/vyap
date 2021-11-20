import React from "react";
import { SimpleHeader } from "../../Components/Header";
import {ReportCard, EmptyReportCard} from "./ReportCard";
import shopImg from "../../assets/illustrations/Shop.svg"
import { useIntl } from "react-intl";

export default function Reports() {
  const intl = useIntl()
  return (
    <div className="bg-white dark:bg-gray-900 h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow">
        <SimpleHeader heading={intl.formatMessage({ id: 'global.reports'})} />
      </div>

      {/* Card Container */}
      <div className="grid w-full grid-cols-2 gap-4 p-4 mt-2 pt-20">
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
