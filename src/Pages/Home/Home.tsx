import { Footer } from "../../Components/Footer";
import React, { useEffect } from "react";
import { ItemCard } from "./ItemCard";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { fetchInboxes } from "src/API/inbox.axios";
import ChatImg from 'src/Pages/ChatView/assets/Chats.svg'
import profileImg from "src/assets/icons/profile/profile-icon.svg"
import AddCustomerModal from "./AddCustomerModal";
import Spinner from "src/Components/Style/Spinner";
import { FormattedMessage, useIntl } from "react-intl";
import { selectCustomerInfo, setCustomers, setCustomerTotal } from "./customersSlice";

export const Home = () => {
  const customer = useSelector(selectCustomerInfo)
  const dispatch = useDispatch()
  const [addCustomerVisible, setAddCustomerVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(customer.customers?.length === 0);
  const [paginationParams, serPaginationParams] = React.useState({
    page: 1,
    search: "",
  })
  const { user, token } = useSelector(selectCredentials)
  const navigate = useNavigate()
  const intl = useIntl();
  useEffect(() => {
    const limit = 10
    if (token) {
      fetchInboxes({
        token,
        offset: ((paginationParams.page - 1) * limit),
        limit,
        search: paginationParams.search === '' ? undefined : paginationParams.search
      }).then((result: any) => {
        dispatch(setCustomers(result.data.data))
        dispatch(setCustomerTotal(result.data.total))
        setLoading(false)
        console.log('data', result.data.data)
      })
    } else {
      navigate('/login')
    }
  }, [paginationParams.search, addCustomerVisible])

  function renderChats() {
    if (loading) {
      return <div className="p-12 mt-12 text-center dark:text-gray-100 grid">
        <Spinner />
        <div className="mt-4">Loading...</div>
      </div>
    }
    if (customer?.customers?.length === 0) {
      return <div>
        <img className="p-12 m-auto mt-12 h-96" src={ChatImg} />
        <div className="w-2/3 px-6 m-auto text-center dark:text-gray-200"> You do not have any transactions, Please invite a customer to start the transactions </div>
      </div>
    }
    return customer?.customers?.map((item, index) => (
      <ItemCard item={item} key={index} />
    ))
  }

  return (
    <div className="dark:bg-gray-900" >
      {/* <!-- * Header --> */}
      <header  className="flex flex-col gap-2 p-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex w-full h-full ">
          <Link to="/more" className="flex flex-col w-4/5">
            <h1 className="text-lg font-semibold text-gray-600 dark:text-gray-100 font-ProductSans">
              <FormattedMessage
                id="home.welcome"
                defaultMessage="Welcome 👋"
              />
            </h1>
            <h1 className="text-lg font-black text-transparent product_sans_bold bg-clip-text bg-gradient-to-br from-blue-500  to-indigo-900 dark:from-blue-200 dark:to-indigo-200 w-40 truncate">
              {user?.organization?.name}
            </h1>
          </Link>
          <div className="flex items-center justify-end w-1/5 ">
            <img
              className="h-12 rounded-full shadow-lg"
              src={user?.profileImageUrl ?? profileImg}
              alt=""
            />
          </div>
        </div>

        {/* <!-- Search Customer Field --> */}

        <div className="relative flex w-full">
          <input
            type="text"
            id="input"
            value={paginationParams.search}
            className="w-full h-10 pl-4 pr-5 bg-gray-100 dark:bg-gray-500 dark:text-gray-100 rounded outline-none "
            placeholder={intl.formatMessage({ id: `action.search` })}
            onChange={(e) => {
              serPaginationParams(prevState => ({
                ...prevState,
                search: e.target?.value
              }))
            }}
          />
        </div>
      </header>
      <div className="relative divide-y card-main-container scrollDes divide-light-blue-400 dark:divide-gray-700">
        {renderChats()}
      </div>
      {/* <!-- Customer Card End -->
      <!-- Add Customer Button --> */}
      <button onClick={() => setAddCustomerVisible(true)} className="h-12 text-white rounded-full text-md add-cutomer-btn bg-gradient-to-br from-blue-500 to-indigo-700">
        <span className="pr-2">+</span>
        <FormattedMessage
          id="action.addCustomer"
          defaultMessage="Add Customer"
        />
      </button>
      {addCustomerVisible && <AddCustomerModal
        isVisible={addCustomerVisible}
        toggleVisibility={() => setAddCustomerVisible(!addCustomerVisible)}
      />}
      <Footer />
    </div>
  );
};
