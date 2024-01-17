/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Home from "./screens/home/home";
import Login from "./screens/auth/login";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { getAllCandidates } from "./services/auth.endpoints";

function App() {
  // Get the id from the current route
  const { id } = useParams();
  console.log(id);

  // Get the id from the current route

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/candidate" element={<Home />} />
            <Route path="/candidate/:id" element={<Home />} />
            <Route path="/candidate/new" element={<Home fromActive={true} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
