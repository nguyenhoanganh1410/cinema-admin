import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { fetchRevenueByCustomer, fetchRevenueByMovie } from "../../../services/StatitisFetch";
import { SDT_VANG_LAI, VND } from "../../../constant";
import { getCinemas } from "../../../services/CinemaFetch";
const dateFormat = "YYYY/MM/DD";

const useFilmStatisticHook = () => {
  const [revenues, setRevenues] = useState([]);
  const user = useSelector((state) => state.user);
  const cinema = useSelector((state) => state.cinema);
 

  const [params, setParams] = useState({
    end_date: moment().format(dateFormat),
    start_date: moment().startOf("month").format(dateFormat),
    movie_id: null,
  });
  const onChangeDate = (date, dateString) => {
    setParams({
      ...params,
      start_date: dateString[0],
      end_date: dateString[1],
    });
  };

  useEffect(() => {
    fetchRevenueByMovie(params)
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          setRevenues([]);
        } else {
          const newDate = data.map((val, idx) => {
            return {
              ...val,
              createdAt: val?.createdAt.substring(0, 10),
              discount: VND.format(val?.discount.toString()),
              totalDiscount: VND.format(val?.totalDiscount.toString()),
              total: VND.format(val?.total.toString()),
              idMovie: "#" + val?.movie?.id,
              name: val?.movie?.nameMovie,
              tickets: val?.count
            };
          });
          setRevenues(newDate);
        }
      })
      .catch(() => {
        console.log("fetch revunues failed!!");
      });
  }, [params]);
 

  return {
    revenues,
    cinema,
    onChangeDate
  };
};

export default useFilmStatisticHook;
