import { Header } from "../../Components/Header";
import React, { useState, useEffect } from "react";
import AppliedFilters from "./AppliedFilters";
import OrderContainer from "./OrderContainer";
import { fetchOrdersAPI } from "src/API/order.axios";
import { useSelector } from "react-redux";
import { selectCredentials } from "../Login/credentialsSlice";
import ModalViewer from "src/Components/Style/ModalViewer";
import { FilterPopup } from "./Filters/FilterPopUp";
import { OrderStatusType } from "./enum";
import { selectOrderFilters } from "./Filters/orderFiltersSlice";
import { PrintAll } from "./Options/PrintAll";
import { ExportAll } from "./Options/ExportAll";
import { useIntl } from "react-intl";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const { token } = useSelector(selectCredentials);
  const [loading, setLoading] = useState(true);
  const [filterPopupOpen, setfilterPopupOpen] = useState(false);
  const filters = useSelector(selectOrderFilters);
  const intl = useIntl()

  useEffect(() => {
    fetchOrdersAPI({
      token: token!,
      orderStatus: filters.orderStatus,
      ordering: filters?.sorting,
      relatedId: filters?.account?.id,
      offset: 0,
      limit: 100,
    }).then((result: any) => {
      setLoading(false);
      setOrders(result?.data?.data ?? []);
    });
  }, [filters.orderStatus, filters?.sorting, filters?.account]);

  return (
    <div className="dark:bg-gray-900">
      {/* header */}
      <div className="w-full pb-3 bg-white shadow dark:bg-gray-800 ">
        <Header  isSticky={false}  heading={intl.formatMessage({ id: 'global.allOrders'})} />
        <AppliedFilters
          openFilters={() => setfilterPopupOpen(!filterPopupOpen)}
        />
      </div>
      {/* body */}
      <div className="bg-gray-100 p-4 dark:bg-gray-900">
        <div
          className="overflow-y-auto bg-white pb-24 dark:bg-gray-800 rounded p-4"
          style={{ height: "calc(100vh - 15rem)" }}
        >
          <OrderContainer loading={loading} orders={orders} />
        </div>
      </div>
      {/* Footer */}

      <ModalViewer
        body={<FilterPopup />}
        isOpen={filterPopupOpen}
        onClose={() => setfilterPopupOpen(false)}
      />

      <div className="fixed bottom-0 w-full h-20 bg-white dark:bg-gray-800 shadow px-8 grid">
        <div className="flex items-center justify-center gap-2 justify-self-center mt-2 w-full max-w-lg">
          <PrintAll apiData={orders} />
          <ExportAll apiData={orders} />
        </div>
      </div>
    </div>
  );
}
