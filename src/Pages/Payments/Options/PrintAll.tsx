import React from 'react';
import format from 'date-fns/format'

interface IProps {
    apiData: any[]
}

export const PrintAll = ({ apiData } : IProps)   => {

    const onPrint = () => {
        if(document.getElementById("divContents")){
            var printContents = document.getElementById("divContents").innerHTML ;
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        }
    }
    
    let payments: any[] = apiData.map((item) => {
        return { 
            ID: "#" + item?.id?.split('-')[0],
            DATE: item.createdAt ? format(new Date(item.createdAt), 'do MMM yyyy') : '',
            NAME: item.receiver?.name,
            AMOUNT: item.amount
        } 
    });

    return (
        <>
            <button className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                    onClick={onPrint} >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                PrintAll   
            </button>
         
          <div className="hidden" id="divContents">
                <table className='min-w-full divide-y divide-gray-200 ' > 
                    <thead className="bg-gray-50 text-center" >
                        <tr>
                            <td>ID</td>
                            <td>DATE</td>
                            <td>Name</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                <tbody>
                    {payments.map((item, index) => (
                        <tr key={index} className="text-center" >
                        {Object.values(item).map((val : any) => (
                            <td key={val} className="px-6 py-2 whitespace-nowrap">{val}</td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>    
        </>
      )

}