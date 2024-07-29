import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import CreatePlayers from "./components/CreatePlayers";
import StartGame from "./components/StartGame";
import { useGlobalContext } from "./ContextProvider/AppContextPovider";

function App() {
  const { loading } = useGlobalContext();

  return (
    <div className="w-screen h-screen bg-[#246727] overflow-x-hidden">
      <h1 className="p-10 w-full text-center font-semibold text-5xl text-white">
        Card Game
      </h1>
      {loading ? (
        <div className="text-white text-2xl w-full text-center">
          Loading....
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/createplayers" element={<CreatePlayers />} />
          <Route path="/startgame" element={<StartGame />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
