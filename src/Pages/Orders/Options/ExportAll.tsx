import React from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'
import type { orderInterface } from 'src/Pages/ChatView/Cards/OrderCard'

interface IProps {
  apiData: orderInterface[];
}

export const ExportAll = ({ apiData }: IProps) => {
    const orders = apiData.map((item) => {
        return {
            ORDER_ID: '#' + item?.id?.split('-')[0],
            DATE: item.createdAt
                ? format(new Date(item.createdAt), 'do MMM yyyy')
                : '',
            SUPPLIER: item?.supplier?.name,
            BUYER: item?.buyer?.name,
            AMOUNT: (
                parseFloat(item?.totalAmount) - parseFloat(item?.flatDiscount)
            ).toFixed(2),
        }
    })

    const exportToCSV = () => {
    /* making worksheet */
        const ws = XLSX.utils.json_to_sheet(orders)

        /* writing workbook (use type 'binary') */
        const csv = XLSX.utils.sheet_to_csv(ws)
        FileSaver.saveAs(
            new Blob([csv], { type: 'application/octet-stream' }),
            'Order_list.csv'
        )

        console.log(apiData)
    }

    return (
        <button
            className="flex justify-center gap-1 items-center w-2/4 h-10 text-sm font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
            onClick={() => exportToCSV()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
            </svg>
            <FormattedMessage
                id="action.exportAll"
                defaultMessage="Export All"
            />
        </button>
    )
}