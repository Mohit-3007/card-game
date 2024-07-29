import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../ContextProvider/AppContextPovider";

const CreatePlayers = () => {
  const navigate = useNavigate();
  const {
    player1,
    setPlayer1,
    player2,
    setPlayer2,
    setLoading,
    setCardsShuffled,
    setPlayer1Dataa,
    setPlayer2Dataa,
  } = useGlobalContext();

  useEffect(() => {
    setCardsShuffled(false);
  }, []);

  useEffect(() => {
    setPlayer1("");
    setPlayer2("");
    // setPlayer1Dataa([]);
    // setPlayer2Dataa([]);
  }, []);

  function handleStartGame() {
    if (player1.trim().length == 0) {
      alert("Player 1 Name is Required! ");
      setPlayer1("");
      return;
    }
    if (player2.trim().length == 0) {
      alert("Player 2 Name is Required! ");
      setPlayer2("");
      return;
    }
    setCardsShuffled(true);

    setLoading(true);
    setTimeout(() => {
      navigate("/startgame");
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="w-screen h-screen bg-[#246727]">
      <div className="w-full px-4 py-3 ">
        {/* container */}
        <div className="w-full h-fit py-4 border rounded-md">
          <h2 className="w-full py-3 text-center font-semibold text-white text-3xl">
            Players
          </h2>
          <div className="w-full py-2 px-5 flex gap-3">
            <label className="text-xl text-white">Player 1 </label>
            <input
              type="text"
              placeholder="Player 1 Name"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className="bg-[#706868] text-black outline-none rounded-md px-2 placeholder:text-gray-300"
            />
          </div>
          <div className="w-full py-2 px-5 flex gap-3">
            <label className="text-xl text-white">Player 2 </label>
            <input
              type="text"
              placeholder="Player 2 Name"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="bg-[#706868] text-black outline-none rounded-md px-2 placeholder:text-gray-300"
            />
          </div>
          <div className="w-full text-center mt-3">
            <button
              className="px-3 py-1.5 border text-2xl font-semibold rounded-xl
                    bg-gradient-to-br from-indigo-500 via-sky-500 via-45% to-emerald-500 to-80%%
                    hover:scale-110 hover:-translate-y-2 duration-300 ease-linear"
              onClick={handleStartGame}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlayers;
