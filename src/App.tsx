import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Table } from "./components/Table";
import { SingleItem } from "./components/SingleItem";
import { NotFound } from "./components/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="details/:id" element={<SingleItem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
