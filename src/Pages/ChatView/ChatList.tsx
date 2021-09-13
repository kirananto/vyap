import React, { useState, useEffect } from 'react'
import PaymentCard from "../../Components/PaymentCard";
import OrderCard from "../../Components/OrderCard";
import { fetchThreadsById } from "../../API/inbox.axios";
import { useSelector } from 'react-redux';
import { selectCredentials } from 'src/Pages/Login/credentialsSlice';
// import chatSvg from './assets/Chats.svg'
const limit = 10

enum ThreadTypeEnum { 
    'PAYMENT'=0,
    'ORDER'=1,
    'MESSAGE'=2
  }
export default function ChatList({ inboxId }: { inboxId: string }) {
    const { user, token } = useSelector(selectCredentials)
    
    const [threads, setThreads] = useState<{
        id: string;
        createdAt: string;
        updatedAt: string;
        inboxHash: string;
        senderId: string;
        msg: string;
        type: ThreadTypeEnum;
        meta: string;
    }[]>([]);
    const [currentPage] = useState(1)

    useEffect(() => {
        fetchThreadsById({ token: token!, inboxId: inboxId, offset: ((currentPage - 1) * limit), limit }).then(res => {
            setThreads(res.data.data)
        })
    }, [])

    function renderChats() {
        // if(threads.length === 0) {
        //     return <img src={chatSvg} />
        // }
        return threads.map((thread) => {
            const layout = thread.senderId === user?.organization?.id ? 'justify-end' : 'justify-start'
            if(thread.type === ThreadTypeEnum.PAYMENT) {
                return <PaymentCard className={layout} thread={thread} />
            }
            if(thread.type === ThreadTypeEnum.ORDER) {
                return <OrderCard className={layout} thread={thread}/>
            }
            return <div>{thread.msg }</div>
        })
    }

    return (
        <div className="flex flex-col gap-5 pb-20 pl-2 pr-2 pt-44 h-screen overflow-y-scroll">
            {renderChats()}
            {/* <p className="text-sm font-medium text-center text-gray-500">Today</p> */}
        </div>
    )
}
