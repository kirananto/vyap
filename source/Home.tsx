import * as React from "react";

export const Home = () => {
  return (
    <div className="mobile-main">
      {/* <!-- * Header --> */}
      <header className="head-container">
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
        <div className="nav-top-container">
          <div className="nav-top-child-1">
            <img
              className="w-8 h-8"
              src="./assets/icons/addProductss.svg"
              alt=""
            />
            <h3 className="text-xs text-gray-600  font-semibold">
              ADD PRODUCT
            </h3>
          </div>
          <div className="nav-top-child-2">
            <img
              className="w-8 h-8"
              src="./assets/icons/allOrders.svg"
              alt=""
            />
            <h3 className="text-xs text-gray-600 font-semibold">ALL ORDERS</h3>
          </div>
          <div className="nav-top-child-3">
            <img className="w-8 h-8" src="./assets/icons/REPORT.svg" alt="" />
            <h3 className="text-xs text-gray-600  font-semibold">REPORTS</h3>
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
        <input type="text" id="input" placeholder="Search Customer" />
        <img src="./assets/icons/search.svg" id="input_img" />
      </div>
      {/* <!-- Customer Field End -->

      <!-- Customer Cards --> */}
      <div className="card-main-container scrollDes divide-y divide-light-blue-400">
        {Array(10)
          .fill(1)
          .map((item: any) => (
            <div className="bottom-line">
              <div className="card-main">
                <div className="card-container">
                  <div className="card-child-1">
                    <img className="w-8" src="./assets/icons/cardProfile.svg" alt="" />
                  </div>
                  <div className="card-child-2">
                    <h2 className="user-name">Sabeer</h2>
                    <h5 className="user-caption">Kannur</h5>
                  </div>
                  <div className="card-child-3">
                    <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-600 rounded-full">
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
