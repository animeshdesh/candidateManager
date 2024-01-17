/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Home from "./screens/home/home";
import Login from "./screens/auth/login";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { getAllCandidates } from "./services/auth.endpoints";

function App() {
  const { id } = useParams();

  const [name, setName] = useState("");

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setName={setName} name={name} />} />
            <Route path="/candidate" element={<Home name={name} />} />
            <Route path="/candidate/:id" element={<Home name={name} />} />
            <Route
              path="/candidate/new"
              element={<Home fromActive={true} name={name} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
