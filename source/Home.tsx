import * as React from "react";

export const Home = () => {
  return (
    <div className="mobile-main">
      {/* <!-- * Header --> */}
      <header className="head-container bg-gradient-to-bl from-blue-500 to-blue-600">
        <div className="head-right">
          <img src="./assets/icons/user.png" alt="" />
          <h1>Shop Name</h1>
        </div>
        <div className="head-left mt-2">
          <img className="w-5" src="./assets/icons/notification.svg" alt="" />
        </div>
      </header>
      {/* <!-- * Header End -->

      <!-- ! Nav-Menu Top --> */}
      <div className="nav-top-main">
        <div className="nav-top-container shadow">
          <div className="nav-top-child-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xs text-gray-500  font-semibold">
              Add Product
            </h3>
          </div>
          <div className="nav-top-child-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            <h3 className="text-xs text-gray-500 font-semibold">All Orders</h3>
          </div>
          <div className="nav-top-child-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h3 className="text-xs text-gray-500  font-semibold">Reports</h3>
          </div>
        </div>
      </div>

      {/* <!-- ! Nav-MenuTop End --> */}

      {/* <!-- Search Customer Field --> */}
      <div className="customer-head-main">
        {/* <!-- <div className="customer-container">
          <h3>Customer</h3>
          <hr />
        </div> --> */}
      </div>
      <div id="input_container">
        <input type="text" id="input" className="shadow-md border-gray-500" placeholder="Search Customer" />
        <img src="./assets/icons/search.svg" id="input_img" />
      </div>
      {/* <!-- Customer Field End -->

      <!-- Customer Cards --> */}
      <div className="card-main-container scrollDes divide-y divide-light-blue-400">
        {Array(10)
          .fill(1)
          .map(() => (
            <div className="bottom-line">
              <div className="card-main">
                <div className="card-container">
                  <div className="card-child-1">
                    <img
                      className="w-8"
                      src="./assets/icons/cardProfile.svg"
                      alt=""
                    />
                  </div>
                  <div className="card-child-2">
                    <h2 className="user-name">Sabeer</h2>
                    <h5 className="user-caption">Kannur</h5>
                  </div>
                  <div className="card-child-3">
                    <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-500 rounded-full">
                      20
                    </div>
                    <div className="card-time">
                      <img src="./assets/icons/time.svg" alt="" />
                      <h5>20 sec ago</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <!-- Customer Card End -->
      <!-- Add Customer Button --> */}
      <button className="add-cutomer-btn">
        Add Customer <span className="circle bg-red-500"></span>
      </button>
      {/* <!-- Add Customer Button End --> */}

      {/* <!-- Nav-Bottom  --> */}
      <div className="nav-bottom-container">
        <div className="nav-bottom-child-1">
          <figure className="grid justify-items-center">
            <img className="w-6" src="./assets/icons/home.svg" alt="" />
            <figcaption className="text-sm font-semibold text-gray-900">
              Home
            </figcaption>
          </figure>
        </div>
        <div className="nav-bottom-child-2">
          <figure className="grid justify-items-center">
            <img className="w-6" src="./assets/icons/more.svg" alt="" />
            <figcaption className="text-sm font-semibold text-gray-900">
              More
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};
