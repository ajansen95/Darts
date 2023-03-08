"use client"

import Score from "@/app/Components/score";
import {useDispatch, useSelector} from "react-redux";
import {nextPlayer} from "@/app/GlobalRedux/Features/player/playerSlice";

export default function Home() {

    const activePlayer = useSelector(state => state.player.activePlayer)
    const scores = useSelector(state => state.player.scores)
    const throwsCurrentPlayer = useSelector(state => state.player.throwsCurrentPlayer)
    const dispatch = useDispatch()

    return (

        <main className="flex flex-col h-screen">
            <nav className="h-10"></nav>

            <div className="bg-slate-900 flex items-center justify-center flex-1">
                <div id="leftSpacing" className="flex-1 h-full"></div>

                <div id="video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="http://192.168.178.60:5000/video" alt="video" width="820"/>
                </div>

                <div id="rightSpacing" className="flex-1 h-full">
                    <div id="rightMenu" className="flex flex-col w-2/5 h-full bg-green-500 ml-auto">

                        <div className="h-min ml-auto mt-5 mr-5">
                            <p className="text-4xl font-bold">Last</p>
                            <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                                <Score></Score>
                            </div>
                        </div>

                        <div className="h-min ml-auto mt-5 mr-5">
                            <p className="text-4xl font-bold">Throws</p>
                            <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                                <p className="text-4xl font-bold text-white">{throwsCurrentPlayer}</p>
                            </div>
                        </div>

                        {/*<div className="h-min ml-auto mt-5 mr-5">
                            <p className="text-4xl font-bold">Best</p>
                            <div className="bg-red-500 h-20 w-44"></div>
                        </div>

                        <div className="h-min ml-auto mt-5 mr-5">
                            <p className="text-4xl font-bold">Worst</p>
                            <div className="bg-red-500 h-20 w-44"></div>
                        </div>*/}

                    </div>
                </div>
            </div>

            <div className="flex flex-row bg-yellow-200 h-36 justify-center items-center">
                <div className="mr-auto ml-5">
                    <button className="h-20 w-44 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Game</button>
                </div>

                <div className={`m-5  ${activePlayer === 1 ? 'border-8 border-dashed border-green-500' : ''}`}>
                    <p className="text-4xl font-bold">P1</p>
                    <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player1}</p>
                    </div>
                </div>
                <div className={`m-5 ${activePlayer === 2 ? 'border-8 border-dashed border-green-500' : ''}`}>
                    <p className="text-4xl font-bold">P2</p>
                    <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player2}</p>
                    </div>
                </div>
                <div className={`m-5 ${activePlayer === 3 ? 'border-8 border-dashed border-green-500' : ''}`}>
                    <p className="text-4xl font-bold">P3</p>
                    <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player3}</p>
                    </div>
                </div>
                <div className={`m-5 ${activePlayer === 4 ? 'border-8 border-dashed border-green-500' : ''}`}>
                    <p className="text-4xl font-bold">P4</p>
                    <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player4}</p>
                    </div>
                </div>

                <div className="ml-auto mr-5">
                    <button className="h-20 w-44 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {dispatch(nextPlayer())}}>
                        Player
                    </button>
                </div>
            </div>

        </main>
  )
}
