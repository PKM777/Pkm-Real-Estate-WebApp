import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { fdb } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from ".././components/Loader";

const SwiperB = () => {
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAll() {
      const collectionRef = collection(fdb, "listings");
      const finder = query(
        collectionRef,
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const getList = await getDocs(finder);
      const listArr = [];
      getList.forEach((doc) => {
        return listArr.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setLists(listArr);
      setLoading(false);
    }

    fetchAll();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (lists.length === 0) {
    return <></>;
  }

  return (
    lists && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {lists.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[300px] overflow-hidden"
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
                {data.name}
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                ${data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && " / month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default SwiperB;
