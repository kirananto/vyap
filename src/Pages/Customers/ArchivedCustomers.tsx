import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import SimpleHeader from 'src/Components/Header/SimpleHeader'
import { useNavigate } from 'react-router-dom'
import { fetchInboxes, restoreInboxById } from 'src/API/inbox.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomers } from './ChatView/chatListSlice'
import RenderChats from './RenderChats'
import ModalViewer from 'src/Components/Style/ModalViewer'
import CustomerOptionsPopup from './Popups/CustomerOptionsPopup'

const ArchivedCustomers = () => {
    const intl = useIntl()
    const navigate = useNavigate()
    const { token } = useSelector(selectCredentials)
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true)

    const [customerOptionModalVisible, setCustomerOptionsModalVisible] = useState<boolean>(false)
    const [selectedInboxId, setSelectedInboxId] = useState<string | undefined>(undefined)

    useEffect(() => {
        const limit = 30
        if (token) {
            fetchInboxes({
                token,
                limit,
                isArchive: true,
            }).then((result) => {
                dispatch(setCustomers(result.data.data))
                setLoading(false)
            })
        } else {
            navigate('/login')
        }
    }, [token, dispatch, navigate, customerOptionModalVisible])

    const restoreInbox = (id: string) => {
        restoreInboxById({ token, id: id })
            .then((result) => {
                console.log(result)
                setCustomerOptionsModalVisible(false)
            })
    }

    return (
        <div className='bg-white dark:bg-slate-800 h-[100vh]'>
            <div className="bg-white dark:bg-slate-900 shadow">
                <SimpleHeader 
                    heading={intl.formatMessage({ id: 'global.archivedCustomers'})} 
                    backFn={() => navigate('/home', { state: { routeSource: 'archive' } })}
                />
            </div>

            <div className="mt-16">
                <RenderChats 
                //key={index}
                    origin={'archived'}
                    setCustomerOptionsModalVisible={setCustomerOptionsModalVisible}
                    setSelectedInboxId={setSelectedInboxId}  
                    loading={loading}
                />
            </div>

            <ModalViewer
                body={
                    <CustomerOptionsPopup
                        onClose={() => {
                            setCustomerOptionsModalVisible(false)
                        }}
                        inboxId={selectedInboxId}
                        restoreInbox={restoreInbox}
                    />
                }
                isOpen={!!customerOptionModalVisible}
                onClose={() => {
                    setCustomerOptionsModalVisible(false)
                }}
            />
        </div>
    )
}

export default ArchivedCustomers