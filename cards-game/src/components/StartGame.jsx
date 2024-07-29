import React, { useEffect, useLayoutEffect, useState } from "react";
import { useGlobalContext } from "../ContextProvider/AppContextPovider";
import { useLocation, useNavigate } from "react-router-dom";
import backCard from "../assets/backCard.jpeg";

const StartGame = () => {
  const {
    player1,
    player2,
    player1Dataa,
    player2Dataa,
    droppedCards,
    setDroppedCards,
    setPlayer1Dataa,
    setPlayer2Dataa,
  } = useGlobalContext();
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState();
  const [playerTurn, setPlayerTurn] = useState(1);
  const [player1Data, setPlayer1Data] = useState([]);
  const [player2Data, setPlayer2Data] = useState([]);
  const [cardLoading, setCardLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setDroppedCards([]);
  }, []);

  useLayoutEffect(() => {
    if(firstRender){
    setCardLoading(true);
    setTimeout(() => {
      console.log(player1Dataa);
      console.log(player1);
      console.log(player2);
      console.log(player2Dataa);
      setPlayer1Data(player1Dataa);
      setPlayer2Data(player2Dataa);
      setCardLoading(false);
      setFirstRender(false);
    }, 1500);
    }
  }, [firstRender, player1, player2, player1Dataa, player2Dataa]);



  useEffect(() => {
    if (!firstRender) {
      if (player1Data.length > 0) setPlayer1Dataa(player1Data);
    }
  }, [player1Data]);

  useEffect(() => {
    if (!firstRender) {
      if (player2Data.length > 0) setPlayer2Dataa(player2Data);
    }
  }, [player2Data]);

  useEffect(() => {
    if (timer === 20) {
      if (playerTurn === 1) {
        setPlayerTurn(2);
      } else setPlayerTurn(1);
    }
  }, [timer]);

  useEffect(() => {
    setTimer(0);
  }, [playerTurn]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer + 1) % 21);
    }, 1000);

    setIntervalId(interval);

    return () => clearInterval(interval);
  }, []);

  // console.log("player1Data ", player1Data);
  // console.log("player2Data ", player2Data);
  //   console.log("droppedCards ", droppedCards);

  return (
    <div>
      <div className="w-full text-center font-medium text-xl text-white flex-col gap-2">
        <span> Timer - {timer}</span>
        <h3 className="text-base underline ">
          {playerTurn === 1 ? player1 : player2} 's Turn
        </h3>
      </div>
      <div className="w-full px-5 mt-6 flex justify-between">
        {/* player 1 section */}
        <div className="w-[30%] border h-fit rounded-md px-3 py-4 flex flex-col items-center">
          <h3 className="w-full text-white text-base text-center">
            {player1} 's Cards
          </h3>

          {/* cards container */}
          <div className="w-full min-h-40 flex flex-wrap gap-2 px-4 mt-3">
            {cardLoading ? (
              <div className="w-full text-center text-white text-xl">
                Loading....
              </div>
            ) : (
              <>
                {playerTurn === 1 &&
                  player1Data.length > 0 &&
                  player1Data.map((each, idx) => {
                    return (
                      <GameCard
                        key={idx}
                        data={each}
                        droppedCards={droppedCards}
                        setDroppedCards={setDroppedCards}
                        playerData={player1Data}
                        setPLayerData={setPlayer1Data}
                        setPlayerTurn={setPlayerTurn}
                        playerTurn={playerTurn}
                        playerName={player1}
                        intervalId={intervalId}
                      />
                    );
                  })}
                {playerTurn === 2 &&
                  player1Data.length > 0 &&
                  player1Data.map((each, idx) => {
                    return <HideCard key={idx} data={backCard} />;
                  })}
              </>
            )}
          </div>
        </div>

        {/* droppped card section */}
        {droppedCards.length > 0 && (
          <div className="w-[30%] h-fit px-3 py-4 flex flex-col items-center gap-2">
            <h3 className="w-full text-white text-base text-center">
              Dropped's Cards
            </h3>
            {/* card */}
            <div className="w-28 h-[140px] border">
              <img
                src={droppedCards[droppedCards.length - 1]?.image}
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* player 2 section */}
        <div className="w-[30%] min-h-40 border rounded-md px-4 py-4 text-center flex flex-col items-center">
          <h3 className="w-full text-white text-base text-center">
            {player2} 's Cards
          </h3>

          {/* cards container */}
          <div className="w-full flex flex-wrap gap-2 px-4 mt-3">
            {cardLoading ? (
              <div className="w-full text-center text-white text-xl">
                Loading....
              </div>
            ) : (
              <>
                {playerTurn === 2 &&
                  player2Data.length > 0 &&
                  player2Data.map((each, idx) => {
                    return (
                      <GameCard
                        key={idx}
                        data={each}
                        droppedCards={droppedCards}
                        setDroppedCards={setDroppedCards}
                        playerData={player2Data}
                        setPLayerData={setPlayer2Data}
                        setPlayerTurn={setPlayerTurn}
                        playerTurn={playerTurn}
                        playerName={player2}
                        intervalId={intervalId}
                      />
                    );
                  })}

                {playerTurn === 1 &&
                  player2Data.length > 0 &&
                  player2Data.map((each, idx) => {
                    return <HideCard key={idx} data={backCard} />;
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartGame;

function GameCard({
  data,
  droppedCards,
  setDroppedCards,
  playerData,
  setPLayerData,
  setPlayerTurn,
  playerTurn,
  playerName,
  intervalId,
}) {
  const navigate = useNavigate();
  function handleDropCard() {
    let array = [...droppedCards];
    array.push(data);
    // console.log(array);
    setDroppedCards(array);
    console.log("playerData ", playerData);

    const newData = playerData?.filter((each) => {
      return each?.code != data.code;
    });
    console.log("newData ", newData);
    setPLayerData(newData);
    const result = checkWithPreviousCard(array);
    setPlayerTurn((prev) => {
      if (prev === 1) return 2;
      else {
        return 1;
      }
    });

    if (result === true) {
      clearInterval(intervalId);
      alert(`${playerName} has Won The Game! `);
      navigate("/");
    }
  }

  function checkWithPreviousCard(array) {
    const cardValues = [
      "ACE",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "JACK",
      "QUEEN",
      "KING",
    ];
    console.log(array);
    if (array.length > 1) {
      let current = array[array.length - 1].value;
      let currentIndex = cardValues.indexOf(current);
      let previous = array[array.length - 2].value;
      let previousIndex = cardValues.indexOf(previous);

      console.log("currentIndex ", currentIndex)
      console.log("previousIndex ", previousIndex)
      if (currentIndex === previousIndex + 1) {
        return true;
      } 
      else if((previous === "K" && current === "A")){
        return true
      }
      else {
        return false;
      }
    }
  }

  return (
    <div
      onClick={handleDropCard}
      className="w-[68px] h-20 border hover:scale-110 duration-200 ease-in-out cursor-pointer"
    >
      <img src={data?.image} className="w-full h-full" />
    </div>
  );
}

function HideCard({ data }) {
  return (
    <div className="w-[68px] h-20 border hover:scale-110 duration-200 ease-in-out cursor-pointer">
      <img src={data} className="w-full h-full" />
    </div>
  );
}
