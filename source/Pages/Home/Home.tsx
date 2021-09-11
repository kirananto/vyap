import { Footer } from "../../Components/Footer";
import React, { useEffect } from "react";
import { ItemCard } from "./ItemCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCredentials } from "../../Pages/Login/credentialsSlice";
import { fetchInboxes } from "../../API/inbox.axios";

export const Home = () => {
  const [inbox, setInbox] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [paginationParams, serPaginationParams] = React.useState({
    page: 1,
    search: "",
  })
  const { user, token } = useSelector(selectCredentials)
  // const history = useHistory()
  useEffect(() => {
    const limit = 10
    if (token) {
      setLoading(true)
      fetchInboxes({
        token, 
        offset: ((paginationParams.page - 1) * limit), 
        limit, 
        search: paginationParams.search === '' ? undefined : paginationParams.search
      }).then(result => {
        setInbox(result.data.data)
        setLoading(false)
        console.log('data', result.data.data)
      })
    } else {
      // history.push('/login')
    }
  }, [paginationParams.search])

  return (
    <div className="mobile-main">
      {/* <!-- * Header --> */}
      <header className="flex flex-col gap-2 p-4 bg-white shadow-md">
        <div className="flex w-full h-full ">
          <Link to="/more" className="flex flex-col w-4/5">
            <h1 className="text-lg font-semibold text-gray-600 font-ProductSans">
              Welcome👋
            </h1>
            <h1 className="text-lg font-black text-transparent PRODUCT-SANS-BOLD bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-900 ">
              {user?.organization?.name}
            </h1>
          </Link>
          <div className="flex items-center justify-end w-1/5 ">
            <img
              className="h-12 rounded-full shadow-lg"
              src={user?.profileImageUrl ?? "../assets/icons/profile/profile-icon.svg"}
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
            className="w-full h-10 pl-4 pr-5 bg-gray-100 rounded outline-none "
            placeholder="Search"
            onChange={(e) => {
              serPaginationParams(prevState => ({
                ...prevState,
                search: e.target?.value
              }))
            }}
          />
        </div>
      </header>
      {loading ? <div> Loading...</div> : null}
      <div className="relative divide-y card-main-container scrollDes divide-light-blue-400">
        {inbox
          .map((item, index) => (
            <ItemCard item={item} key={index} />
          ))}
      </div>
      {/* <!-- Customer Card End -->
      <!-- Add Customer Button --> */}
      <button className="text-white text-md rounded-full h-12 add-cutomer-btn bg-gradient-to-br from-blue-500 to-indigo-700">
        Add Customer
      </button>
      <Footer />
    </div>
  );
};
