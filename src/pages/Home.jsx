import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EachItem from "../components/EachItem";
import SwiperB from "../components/SwiperB";
import { fdb } from "../firebase";

const Home = () => {
  const [offers, setOffers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const collectionRef = collection(fdb, "listings");
        const useQuest = query(
          collectionRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const getData = await getDocs(useQuest);

        const listArr = [];
        getData.forEach((doc) => {
          return listArr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOffers(listArr);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const collectionRef = collection(fdb, "listings");
        const useQuest = query(
          collectionRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const getData = await getDocs(useQuest);

        const listArr = [];
        getData.forEach((doc) => {
          return listArr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listArr);
      } catch (error) {}
    }

    fetchData();
  }, []);

  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const collectionRef = collection(fdb, "listings");
        const useQuest = query(
          collectionRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const getData = await getDocs(useQuest);

        const listArr = [];
        getData.forEach((doc) => {
          return listArr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listArr);
      } catch (error) {}
    }

    fetchData();
  }, []);
  return (
    <div>
      <SwiperB />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offers && offers.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {offers.map((listing) => (
                <EachItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places for rent
            </h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {rentListings.map((listing) => (
                <EachItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places for sale
            </h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {saleListings.map((listing) => (
                <EachItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
