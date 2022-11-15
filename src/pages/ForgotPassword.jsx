import { useState } from "react";

import { Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

const ForgotPassword = () => {
  const [loginData, setLoginData] = useState({
    email: "",
  });

  const { email } = loginData;

  const emailFunc = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(loginData);
  };

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center bg-center bg-no-repeat bg-cover bg-[url('https://images.pexels.com/photos/966397/pexels-photo-966397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <form className="w-[35%] ">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mt-2 mb-2 text-sm font-bold text-black"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@real-state.com"
            value={email}
            onChange={emailFunc}
          />
        </div>
        <div className="mb-6 relative"></div>
        <div className="flex justify-between items-start mb-6">
          <p className="mb-6">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
            >
              Register
            </Link>
          </p>
          <p className="">
            <Link
              to="/sign-in"
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
            >
              Sign-In Instead
            </Link>
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
        >
          Reset Password
        </button>
        <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
          <p className="text-center text-white font-semibold mx-4">OR</p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
        >
          <FcGoogle className="text-2xl  bg-white rounded-full mr-2" />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
