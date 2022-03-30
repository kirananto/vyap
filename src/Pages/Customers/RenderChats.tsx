import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import Spinner from 'src/Components/Style/Spinner'
import { selectChatList } from './ChatView/chatListSlice'
import ChatImg from 'src/Pages/Customers/ChatView/assets/Chats.svg'
import { ItemCard } from './ItemCard'
import { useScrollDirection } from 'react-use-scroll-direction'


interface iProps {
    loading: boolean,
    isScrolling: boolean
    setSelectedInboxId: React.Dispatch<React.SetStateAction<string | undefined>>
    setCustomerOptionsModalVisible : React.Dispatch<React.SetStateAction<boolean>>
}

const RenderChats = ({loading, setSelectedInboxId, setCustomerOptionsModalVisible} : iProps) => {

    const chatList = useSelector(selectChatList)
    const customer = Object.values(chatList)

    const [scrollTargetRef, target] = useCallbackRef()
    const { isScrolling } =   useScrollDirection(target)

    function useCallbackRef() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [value, setValue] = React.useState<any>()
        const ref = useCallback((node: HTMLElement) => {
            if (node !== null) setValue(node)
        }, [])
        return [ref, value]
    }
    if (loading) {
        return (
            <div className="mt-12 grid p-12 text-center dark:text-slate-100">
                <Spinner />
            </div>
        )
    }

    if (customer?.length === 0) {
        return (
            <div>
                <img
                    loading="lazy"
                    className="m-auto mt-12 h-96 p-12"
                    alt="no transactions"
                    src={ChatImg}
                />
                <div className="m-auto w-2/3 px-6 text-center dark:text-slate-200">
                    No customers
                </div>
            </div>
        )
    }
    return <div ref={scrollTargetRef}>
        {customer?.map((item, index) => (
            <ItemCard 
                item={item} 
                isScrolling={isScrolling} 
                key={index}
                setCustomerOptionsModalVisible={setCustomerOptionsModalVisible}
                setSelectedInboxId={setSelectedInboxId} 
            />
        ))

        }

        {/* <div className="flex p-5 my-10 justify-center dark:bg-slate-800 bg-slate-100 text-green-400 dark:text-green-300">
            <div className="pr-5  self-center">
                <Archive size={8}/>
            </div>
            <div className="pr-2  self-center">
                    
                <NavLink to="/archived_inboxes" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500">
                    <h2 className="font-bold mb-1 pt-1 text-slate-600 dark:text-slate-200 truncate">{intl.formatMessage({ id: 'global.archivedCustomers'})}</h2>
                </NavLink>
            </div>

        </div> */}
        
    </div>
}

export default RenderChats