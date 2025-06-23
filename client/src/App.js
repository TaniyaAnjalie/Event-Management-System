import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Components/Header";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import Read from "./pages/Read";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
