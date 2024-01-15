/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Home from "./screens/home/home";
import Login from "./screens/auth/login";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAllCandidates } from "./services/auth.endpoints";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getAllCandidates();
      setAllUsers(response);
    };

    getAllUsers();
  }, []);
  console.log(allUsers);

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/candidate" element={<Home allUsers={allUsers} />} />
          </Routes>
          <Routes>
            <Route
              path="/candidate/new"
              element={<Home allUsers={allUsers} fromActive={true} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
