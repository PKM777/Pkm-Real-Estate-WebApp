import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { FcHome } from "react-icons/fc";
import { useEffect } from "react";
import { fdb } from "../firebase";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [detail, setdetail] = useState(false);
  const [data, setData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = data;
  function onChange(e) {
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function onLogout() {
    auth.signOut();
    navigate("/");
    toast.success("Logged out successfully");
  }

  function onSubmit() {}

  return (
    <div className="w-[100%] h-[100%] pb-[10%] flex justify-center items-center flex-col bg-center bg-no-repeat bg-cover bg-[url('https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <h1 className="text-3xl text-center m-8 font-bold">{`Hi, ${name}`}</h1>
      <form className="w-[35%]">
        <div className="mb-6 mt-6">
          <input
            type="text"
            id="name"
            value={name}
            disabled={!detail}
            onChange={onChange}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              detail && "bg-red-200 focus:bg-red-200"
            }`}
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex justify-between items-start mb-6">
          <p className="flex items-center ">
            Do you want to change your name?
            <span
              onClick={() => {
                detail && onSubmit();
                setdetail((prevState) => !prevState);
              }}
              className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
            >
              {detail ? "Apply change" : "Edit"}
            </span>
          </p>
          <p
            onClick={onLogout}
            className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
          >
            Sign out
          </p>
        </div>
      </form>
      <button
        type="submit"
        className="w-[35%] bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
      >
        <Link to="/create-listing" className="flex justify-center items-center">
          <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
          Sell or rent your home
        </Link>
      </button>
    </div>
  );
};

export default Profile;
