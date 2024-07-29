import React, { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../ContextProvider/AppContextPovider';

const DashBoard = () => {
    const navigate = useNavigate();
    const { loading, setLoading, setCardsShuffled, setDeckId, setPlayer1Dataa, setPlayer2Dataa } = useGlobalContext();

    useLayoutEffect(() => {
        setDeckId();
        setCardsShuffled(false)
        setPlayer1Dataa([]);
        setPlayer2Dataa([]);

        console.log("UseLayout Effect ");
    },[])

  function handleStartGame(){
    setLoading(true);

    setTimeout(() => {
        navigate('/createplayers');
        setLoading(false);
    },1000)
  }


  return (
    <div className='w-screen h-screen bg-[#246727]'>
        <div className='w-full py-32 text-center'>
            {loading ? <div className='text-white text-2xl'>
                Loading....
            </div> : (
                <button onClick={handleStartGame} className="text-6xl text-[#262222ed] border font-semibold px-6 py-3 rounded-3xl bg-gradient-to-br
                    from-indigo-500 via-sky-500 via-45% to-emerald-500 to-80%%
                    hover:scale-110 hover:-translate-y-3 duration-300 ease-linear">Let's Start
                </button>
            )}
        </div>
     </div> 
  )
}

export default DashBoard