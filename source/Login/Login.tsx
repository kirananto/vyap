import React from "react";

export default function Login() {
  return (
    <section className="flex flex-col items-center h-screen md:flex-row ">
      <div className="flex items-center justify-center w-full h-screen px-6 bg-white md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
        <div className="w-80 h-100">
          <a className="flex items-center w-32 mb-4 font-medium text-indigo-900 title-font md:mb-0">
            <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"></div>
            <h2 className="text-lg font-bold tracking-tighter text-black uppercase duration-500 ease-in-out transform ttransition hover:text-lightBlue-500 dark:text-indigo-400">
              {" "}
              Vyap App{" "}
            </h2>
          </a>
          <h1 className="mt-12 text-2xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">
            Log in to your account
          </h1>
          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                Phone number
              </label>
              <input
                type="email"
                name=""
                id=""
                placeholder="Your phone number"
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              />
            </div>
            
            <button
              type="submit"
              className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg hover:bg-indigo-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
            >
              Log In
            </button>
          </form>
          <hr className="w-full my-6 border-indigo-100" />
          <p className="mt-8 text-center">
            Need an account?{" "}
            <a
              href="#"
              className="font-semibold text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
