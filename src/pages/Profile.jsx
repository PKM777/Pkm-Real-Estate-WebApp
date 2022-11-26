import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { FcHome } from "react-icons/fc";
import EachItem from "../components/EachItem";

import { fdb } from "../firebase";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [detail, setdetail] = useState(false);
  const [data, setData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [lists, setLists] = useState(null);
  const [load, setLoad] = useState(true);
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

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
      const userRef = doc(fdb, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
      });
      toast.success("Profile name Updated successfully");
    } catch (error) {
      toast.error("could not update profile name");
    }
  }

  useEffect(() => {
    async function fetchAllLists() {
      const listingRef = collection(fdb, "listings");
      const ask = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const getAllLists = await getDocs(ask);
      let items = [];
      getAllLists.forEach((item) => {
        return items.push({
          id: item.id,
          data: item.data(),
        });
      });

      setLists(items);
      setLoad(false);
    }

    fetchAllLists();
  }, [auth.currentUser.uid]);

  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(fdb, "listings", listingID));
      const updatedListings = lists.filter(
        (listing) => listing.id !== listingID
      );
      setLists(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
  function onEdit(listingID) {
    navigate(`/edit/${listingID}`);
  }

  return (
    <div className="w-[100%] bg-white pb-[10%] flex justify-center items-center flex-col ">
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
              detail && "text-yellow-400 focus:bg-blue-600"
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
        <Link to="/create" className="flex justify-center items-center">
          <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
          Sell or rent your home
        </Link>
      </button>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!load && lists.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {lists.map((listing) => (
                <EachItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
