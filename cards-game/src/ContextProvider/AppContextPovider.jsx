import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const GlobalContext = createContext(null);

const GlobalContextPovider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [deckId, setDeckId] = useState();
  const [remainingCards, setRemainingCards] = useState();
  const [player1Dataa, setPlayer1Dataa] = useState([]);
  const [player2Dataa, setPlayer2Dataa] = useState([]);
  const [cardsShuffled, setCardsShuffled] = useState(false);
  const [droppedCards, setDroppedCards] = useState([]);

  //   if (deckId) {
  //     console.log("deckId ", deckId);
  //     console.log("remainingCards innn ", remainingCards);
  //   }
  if (player2Dataa.length > 0) {
        console.log("player1Data ", player1Dataa);
        console.log("player2Data ", player2Dataa);
        // console.log("remainingCards ", remainingCards);
  }

  function reducer(state, action){
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 };
        case 'decrement':
            return { ...state, count: state.count - 1 };
        case 'reset':
            return { ...state, count: 0 };
        default:
            return state;
    }
  }

//   const [state, dispatch] = useReducer(initialValue, reducer);

  useEffect(() => {
    if (deckId) {
      distributeCards("one");
    }
  }, [deckId]);

  useEffect(() => {
    if (cardsShuffled) {
      shuffleCardDeck();
    }
  }, [cardsShuffled]);

  async function distributeCards(player) {
    if (player === "one") {
      const result = await distributeCardFetchCall();
      console.log("before ", remainingCards);
      setPlayer1Dataa(result?.cards);
      setRemainingCards((prev) => prev - 8);
      distributeCards("two");
      console.log("after ", remainingCards);
    } else {
      const result = await distributeCardFetchCall();
      setPlayer2Dataa(result?.cards);
      setRemainingCards((prev) => prev - 8);
    }
  }

  async function distributeCardFetchCall() {
    try {
      const data = await fetch(
        `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`
      );
      // console.log(data)
      if (!data.ok) {
        throw new Error(data?.status);
      }
      const resp = await data.json();
      //   console.log("cards to distribute ", resp);
      if (!resp.success) {
        throw new Error("Failed to Distribute Cards");
      }
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  //   making api call for shuffelled cards
  async function shuffleCardDeck() {
    try {
      const data = await fetch(
        "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      console.log(data);
      if (data.ok === true) {
        const response = await data.json();
        console.log(response);
        if (response.success) {
          setDeckId(response?.deck_id);
          setRemainingCards(response?.remaining);
        } else {
          throw new Error("Failed to Create a Deck of Cards");
        }
      } else {
        throw new Error(data.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  let initialState = {
    loading,
    setLoading,
    player1,
    player2,
    setPlayer1,
    setPlayer2,
    deckId,
    setDeckId,
    remainingCards,
    setRemainingCards,
    cardsShuffled,
    setCardsShuffled,
    player1Dataa,
    setPlayer1Dataa,
    player2Dataa,
    setPlayer2Dataa,
    droppedCards,
    setDroppedCards,
  };
  return (
    <GlobalContext.Provider value={initialState}>
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobalContext() {
  const useAppContext = useContext(GlobalContext);
  return useAppContext;
}

export { GlobalContextPovider, useGlobalContext };
