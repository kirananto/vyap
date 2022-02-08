import React, { useState, useEffect, useRef } from 'react'
import PaymentCard from '../../Components/PaymentCard'
import OrderCard from '../../Components/OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import ChatImg from 'src/Pages/ChatView/assets/Chats.svg'
import Spinner from 'src/Components/Style/Spinner'
import { fetchThreadsByInbox, selectChatList, ThreadTypeEnum } from './chatListSlice'
import { useParams } from 'react-router'

//TODO use virtualization over here
const limit = 1000

export default function ChatList({ inboxHash, toRefresh }: { inboxHash?: string, toRefresh: boolean }) {
    const { user, token } = useSelector(selectCredentials)
    const [currentPage] = useState(1)
    const chatList = useSelector(selectChatList)

    const dispatch = useDispatch()

    const { id } = useParams()
    const chats = chatList[`${id}`]


    const messagesEndRef = useRef<any>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()

    }


    useEffect(() => {
        if (chats?.threads?.length > 2) {
            setTimeout(scrollToBottom, 100)
        }
    }, [chats?.threads?.length])


    useEffect(() => {
        if(inboxHash) {
            dispatch(fetchThreadsByInbox({ token: token!, inboxHash: inboxHash!, id: id!, offset: ((currentPage - 1) * limit), limit }))
        }
    }, [toRefresh, token, inboxHash, currentPage])

    function renderChats() {
        if (chats?.error) {
            return <div className="p-12 mt-12 text-center dark:text-gray-100"> Error loading chats...</div>
        }
        if (chats?.isLoading && chats?.threads?.length < 1) {
            return <div className="p-12 mt-12 text-center dark:text-gray-100 grid">
                <Spinner />
            </div>
        }
        if (chats?.threads?.length <= 0) {
            return <div>
                <img className="p-12 m-auto mt-6 h-72" alt="no Chats" src={ChatImg} />
                <div className="w-2/3 px-6 m-auto text-center dark:text-gray-200"> You do not have any transactions, Create a transaction to get started. </div>
            </div>
        }
        return chats?.threads?.map((thread) => {
            const layout = thread.senderId === user?.organization?.id ? 'justify-end' : 'justify-start'
            if (thread.type === ThreadTypeEnum.PAYMENT) {
                return <PaymentCard key={thread.id} className={layout} thread={thread} />
            }
            if (thread.type === ThreadTypeEnum.ORDER) {
                return <OrderCard key={thread.id} className={layout} thread={thread} />
            }
            return <div key={thread.id}>{thread.msg}</div>
        }).reverse()
    }

    return (
        <div
            className="flex flex-col gap-5 pl-2 pr-2 pt-48 h-screen overflow-y-scroll pb-48">
            {renderChats()}
            <div ref={messagesEndRef} />
        </div>
    )
}