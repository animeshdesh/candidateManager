/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Home from "./screens/home/home";
import Login from "./screens/auth/login";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { getAllCandidates } from "./services/auth.endpoints";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  // Get the id from the current route
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getAllCandidates();
      setAllUsers(response);
    };

    getAllUsers();
  }, []);

  // Get the id from the current route

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/candidate" element={<Home allUsers={allUsers} />} />
            <Route
              path="/candidate/:id"
              element={<Home allUsers={allUsers} />}
            />
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
