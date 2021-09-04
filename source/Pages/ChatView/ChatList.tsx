import React, { useState, useEffect } from 'react'
import PaymentCard from "../../Components/PaymentCard";
import OrderCard from "../../Components/OrderCard";
// import { fetchThreadsById } from "../../API/inbox.axios";
import { useSelector } from 'react-redux';
import { selectCredentials } from '../../Pages/Login/credentialsSlice';
// const limit = 10

enum ThreadTypeEnum { 
    'PAYMENT'=0,
    'ORDER'=1,
    'MESSAGE'=2
  }
export default function ChatList({ inboxId }: { inboxId: string }) {
    const { user } = useSelector(selectCredentials)
    
    const [threads, setThreads] = useState<{
        id: string;
        createdAt: string;
        updatedAt: string;
        inboxHash: string;
        senderId: string;
        msg: string;
        threadType: ThreadTypeEnum;
        meta: string;
    }[]>([]);
    // const [currentPage] = useState(1)


    useEffect(() => {
        setThreads([
            {
                id: '323',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                inboxHash: inboxId,
                senderId: '3223',
                msg: 'Hello',
                threadType: ThreadTypeEnum.PAYMENT,
                meta: '32323232'
            },
            {
                id: '323',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                inboxHash: inboxId,
                senderId: 'bc4647d8-4d15-4981-829c-2fea4ea820a3',
                msg: 'Hello',
                threadType: ThreadTypeEnum.ORDER,
                meta: '32323232'
            },{
                id: '323',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                inboxHash: inboxId,
                senderId: '3223',
                msg: 'Hello',
                threadType: ThreadTypeEnum.PAYMENT,
                meta: '32323232'
            },
            {
                id: '323',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                inboxHash: inboxId,
                senderId: 'bc4647d8-4d15-4981-829c-2fea4ea820a3',
                msg: 'Hello',
                threadType: ThreadTypeEnum.ORDER,
                meta: '32323232'
            },{
                id: '323',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                inboxHash: inboxId,
                senderId: '3223',
                msg: 'Hello',
                threadType: ThreadTypeEnum.PAYMENT,
                meta: '32323232'
            },
            {
                id: '323',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                inboxHash: inboxId,
                senderId: 'bc4647d8-4d15-4981-829c-2fea4ea820a3',
                msg: 'Hello',
                threadType: ThreadTypeEnum.ORDER,
                meta: '32323232'
            }
        ])
    }, [])
    // useEffect(() => {
    //     fetchThreadsById({ token: token!, inboxId: inboxId, offset: ((currentPage - 1) * limit), limit }).then(res => {
    //         setThreads(res.data.data)
    //     })
    // }, [])

    return (
        <div className="flex flex-col gap-5 pb-20 pl-2 pr-2 pt-44 h-screen overflow-y-scroll">
            {threads.map((thread) => {
                const layout = thread.senderId === user?.organization?.id ? 'justify-end' : 'justify-start'
                if(thread.threadType === ThreadTypeEnum.PAYMENT) {
                    return <PaymentCard className={layout} thread={thread} />
                }
                if(thread.threadType === ThreadTypeEnum.ORDER) {
                    return <OrderCard className={layout} thread={thread}/>
                }
            })}
            {/* <p className="text-sm font-medium text-center text-gray-500">Today</p> */}
        </div>
    )
}
