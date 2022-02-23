import React from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useSelector } from 'react-redux'
import type { IFetchAllPaymentsDataEntity } from 'src/types/fetchAllPayments'
import Button from 'src/Components/Style/Button'

interface IProps {
    apiData?: IFetchAllPaymentsDataEntity[]
}
interface IPaymentsProps {
    DATE: string
    BUYER: string
    SELLER: string
    DEBIT: string
}

export const ExportAll = ({ apiData }: IProps) => {
    const { user } = useSelector(selectCredentials)
    const payments: IPaymentsProps[] | undefined = apiData?.map((item) => {
        const credit : boolean = user?.organization?.name === item.receiver?.name
        return {
            DATE: item.createdAt ? format(new Date(item.createdAt), 'do MMM yyyy') : '',
            BUYER: item.senderOrg?.name,
            SELLER: item.receiver?.name,
            CREDIT:  credit ? item.amount : ' ',
            DEBIT: credit ? ' ' : item.amount,
      
        }
    })

    const exportToCSV = () => {
        /* making worksheet */
        if(payments) {
            const ws = XLSX.utils.json_to_sheet(payments)
            /* writing workbook (use type 'binary') */
            const csv = XLSX.utils.sheet_to_csv(ws)
            FileSaver.saveAs(new Blob([csv], { type: 'application/octet-stream' }), 'Payment_list.csv')
        }
    }

    return (

        <Button className="flex print:hidden justify-center gap-1 items-center w-2/4 h-10 text-sm"
            onClick={() => exportToCSV()} >
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <FormattedMessage
                    id="action.exportAll"
                    defaultMessage="Export All"
                />
            </>
        </Button>
    )
}