import { Header } from "../../Components/Header";
import React, { useState, useEffect } from "react";
import AppliedFilters from "./AppliedFilters";
import PaymentContainer from "./PaymentContainer";
import { fetchAllPayments } from "src/API/payment.axios";
import { useSelector } from "react-redux";
import { selectCredentials } from "../Login/credentialsSlice";
import ModalViewer from "src/Components/Style/ModalViewer";
import { FilterPopup } from "./Filters/FilterPopUp";
import { selectPaymentFilters } from "./Filters/paymentFiltersSlice";
import { ExportAll } from "./Options/ExportAll";
import { PrintAll } from "./Options/PrintAll";
import { useIntl } from "react-intl";
import useQueryParam from "src/useQueryParams";

export default function Payments() {
  const { token } = useSelector(selectCredentials);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPopupOpen, setfilterPopupOpen] = useQueryParam<boolean>("filterPopupOpen");
  const filters = useSelector(selectPaymentFilters);
  const intl = useIntl()

  useEffect(() => {
    fetchAllPayments({
      token: token!,
      limit: 100,
      offset: 0,
      paymentMethod: filters?.paymentMethod,
      ordering: filters?.sorting,
      relatedId: filters?.account?.id,
    }).then((result: any) => {
      console.log(result.data);
      setLoading(false);
      setPayments(result.data.data);
      //TODO handle the payments better
    });
  }, [filters?.paymentMethod, filters?.sorting, filters?.account?.id]);
  return (
    <div className="">
      {/* header */}
      <div className="w-full pb-3 bg-white shadow dark:bg-gray-800 ">
        <Header  isSticky={false}  heading={intl.formatMessage({ id: 'global.allPayments'})} />
        <AppliedFilters
          openFilters={() => setfilterPopupOpen(!filterPopupOpen)}
        />
      </div>
      {/* body */}
      <div className="bg-gray-100 p-4 dark:bg-gray-900">
        <div
          className="overflow-y-auto bg-white dark:bg-gray-800 rounded p-4"
          style={{ height: "calc(100vh - 15rem)" }}
        >
          <PaymentContainer payments={payments} loading={loading} />
        </div>
      </div>

      <ModalViewer
        body={<FilterPopup />}
        isOpen={filterPopupOpen!}
        onClose={() => setfilterPopupOpen(false)}
      />
      {/* Footer */}

      <div className="fixed bottom-0 w-full h-20 bg-white shadow px-8 grid dark:bg-gray-800">
        <div className="flex items-center justify-center gap-2 justify-self-center mt-2 w-full max-w-lg">
          <PrintAll apiData={payments} />
          <ExportAll apiData={payments} />
        </div>
      </div>
    </div>
  );
}
