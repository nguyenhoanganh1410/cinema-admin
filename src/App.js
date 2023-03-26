import "./App.css";
import LoginForm from "./components/form/LoginForm";
import HomePage from "./pages/HomePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import tokenService from "./service/token.service";
import { setCinema, setUser } from "./redux/actions";
import cinameApi from "./api/cinemaApi";

function App() {
  const navigator = useNavigate();
  const depatch = useDispatch();
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    const userInLocalStorage = tokenService.getUser();
    console.log(userInLocalStorage);
    if (userInLocalStorage) {
      depatch(setUser(userInLocalStorage.staff));
      navigator("/");
      const getCinemaId = async (id) =>{
        const data = await cinameApi.getCinemaById(id);
        depatch(setCinema(data))
      } 
      getCinemaId(userInLocalStorage?.staff?.cinema_id)
    } else {
      navigator("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/login" element={<LoginPage setToken={setToken} />} /> */}

      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
