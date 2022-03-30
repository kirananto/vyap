import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import SimpleHeader from 'src/Components/Header/SimpleHeader'
import { useNavigate } from 'react-router-dom'
import { fetchInboxes } from 'src/API/inbox.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomers, selectChatList } from './ChatView/chatListSlice'
import RenderChats from './RenderChats'
//import { IndividualChatInterface, selectChatList, setCustomers } from './ChatView/chatListSlice'

const ArchivedCustomers = () => {
    const intl = useIntl()
    const navigate = useNavigate()
    const { token } = useSelector(selectCredentials)
    const dispatch = useDispatch()

    const [paginationParams, setPaginationParams] = React.useState({
        page: 1,
    })

    // const [loading, setLoading] = React.useState(
    //     customer?.length === 0
    // )

    useEffect(() => {
        const limit = 30
        if (token) {
            fetchInboxes({
                token,
                offset: (paginationParams.page - 1) * limit,
                limit,
                isArchive: true,
            }).then((result) => {
                dispatch(setCustomers(result.data.data))
                // setLoading(false)
            })
        } else {
            navigate('/login')
        }
    }, [token, paginationParams.page, dispatch, navigate])

    // const restoreInbox = (id: string) => {
    //     restoreInboxById({ token, id: id })
    //         .then((result) => {
    //             console.log(result)
    //         })
    // }

    return (
        <div>
            <div className="bg-white dark:bg-slate-900 shadow">
                <SimpleHeader heading={intl.formatMessage({ id: 'global.archivedCustomers'})}  backFn={() => navigate('/home')}/>
            </div>
            
            <RenderChats 
                isScrolling={isScrolling} 
                key={index}
                setCustomerOptionsModalVisible={setCustomerOptionsModalVisible}
                setSelectedInboxId={setSelectedInboxId}  
                loading={loading} />

        </div>
    )
}

export default ArchivedCustomers