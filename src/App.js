import "./App.css";
import LoginForm from "./components/form/LoginForm";
import HomePage from "./pages/HomePage";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  //console.log("app");
  return (
    // <div className="App">
    //   {/* <HomePage /> */}
    //   <LoginForm />
    // </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/login" element={<LoginPage setToken={setToken} />} /> */}
      <Route path="/login" element={<LoginForm />} />

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
