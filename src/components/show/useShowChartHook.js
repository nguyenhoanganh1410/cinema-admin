import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getFilmsByIdCinema } from "../../services/FilmFeatch";
import React from "react";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  return res.json();
};
const useShowChartHook = ({ setTab }) => {
  const user = useSelector((state) => state.user);
  const cinema = useSelector((state) => state.cinema);
  const [selectCinemaOptions, setSelectCinemaOptions] = useState([]);
  const { data, error, isError, isLoading } = useQuery("films", () =>
    getFilmsByIdCinema(cinema?.id)
  );

  const dataFilm = data?.map((film) => {
    return {
      value: film?.id,
      label: film?.nameMovie,
    };
  });

  //back to
  const handleReturn = () => {
    setTab(0);
  };

  useEffect(() => {
    setSelectCinemaOptions([
      {
        value: cinema?.id,
        label: cinema?.name,
      },
    ]);
  }, []);
  return {
    cinema,
    handleReturn,
    selectCinemaOptions,
    dataFilm,
  };
};

export default useShowChartHook;
