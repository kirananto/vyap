import React, { useState, useEffect } from 'react'
import PaymentCard from "../../Components/PaymentCard";
import OrderCard from "../../Components/OrderCard";
import { fetchThreadsById } from "../../API/inbox.axios";
import { useSelector } from 'react-redux';
import { selectCredentials } from 'src/Pages/Login/credentialsSlice';
import ChatImg from 'src/Pages/ChatView/assets/Chats.svg'
import Spinner from 'src/Components/Style/Spinner';

const limit = 10

enum ThreadTypeEnum {
    'PAYMENT' = 0,
    'ORDER' = 1,
    'MESSAGE' = 2
}
export default function ChatList({ inboxId, toRefresh }: { inboxId?: string, toRefresh: boolean }) {
    const { user, token } = useSelector(selectCredentials)
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false)
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
        setError(false)
        fetchThreadsById({ token: token!, inboxId: inboxId!, offset: ((currentPage - 1) * limit), limit }).then((res: any) => {
            setThreads(res.data.data)
            setLoading(false)
        }).catch(error => {
            if (inboxId) {
                setError(true)
            }
        })
    }, [toRefresh, token, inboxId, currentPage])

    function renderChats() {
        if (error) {
            return <div className="p-12 mt-12 text-center dark:text-gray-100"> Error loading chats...</div>
        }
        if (loading) {
            return <div className="p-12 mt-12 text-center dark:text-gray-100 grid">
                <Spinner />
                <div className="mt-4">Loading...</div>
            </div>
        }
        if (threads.length === 0) {
            return <div>
                <img className="p-12 m-auto mt-12 h-96" src={ChatImg} />
                <div className="w-2/3 px-6 m-auto text-center dark:text-gray-200"> You do not have any transactions, Please invite a customer to start the transactions </div>
            </div>
        }
        return threads.map((thread) => {
            const layout = thread.senderId === user?.organization?.id ? 'justify-end' : 'justify-start'
            if (thread.type === ThreadTypeEnum.PAYMENT) {
                return <PaymentCard className={layout} thread={thread} />
            }
            if (thread.type === ThreadTypeEnum.ORDER) {
                return <OrderCard className={layout} thread={thread} />
            }
            return <div>{thread.msg}</div>
        })
    }

    return (
        <div className="flex flex-col gap-5 pb-20 pl-2 pr-2 pt-44 h-screen overflow-y-scroll">
            {renderChats()}
            {/* <p className="text-sm font-medium text-center text-gray-500">Today</p> */}
        </div>
    )
}
