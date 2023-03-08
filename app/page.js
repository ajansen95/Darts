"use client"

import Score from "@/app/components/score";
import {useDispatch, useSelector} from "react-redux";

export default function Home() {

    const player = useSelector(state => state.player)
    const scores = useSelector(state => state.player.scores)
    const dispatch = useDispatch();

    return (

        <main className="flex flex-col h-screen">
            <nav className="h-10"></nav>

            <div className="bg-slate-900 flex items-center justify-center border border-dashed flex-1">
                <div id="leftSpacing" className="flex-1 h-full"></div>

                <div id="video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="http://192.168.178.75:5000/video" alt="video"/>
                </div>

                <div id="rightSpacing" className="flex-1 h-full">
                    <div id="rightMenu" className="flex flex-col w-2/5 h-full bg-green-500 ml-auto">

                        <div className="h-min ml-auto mt-5 mr-5 border border-dashed border-black">
                            <p className="text-4xl font-bold">Last</p>
                            <div className="bg-red-500 h-20 w-44">
                                <Score></Score>
                            </div>
                        </div>

                        <div className="h-min ml-auto mt-5 mr-5 border border-dashed border-black">
                            <p className="text-4xl font-bold">Best</p>
                            <div className="bg-red-500 h-20 w-44"></div>
                        </div>

                        <div className="h-min ml-auto mt-5 mr-5 border border-dashed border-black">
                            <p className="text-4xl font-bold">Worst</p>
                            <div className="bg-red-500 h-20 w-44"></div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-row bg-yellow-200 h-36 justify-center items-center">
                <div className="mr-auto ml-5 border border-dashed border-black">
                    <p className="text-4xl font-bold">Game</p>
                    <div className="bg-red-500 h-20 w-44"></div>
                </div>

                <div className={`m-5 border ${player.activePlayer === 1 ? 'border-dashed border-black' : ''}`}>
                    <p className="text-4xl font-bold">P1</p>
                    <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player1}</p>
                    </div>
                </div>
                <div className="m-5 border border-dashed border-black">
                    <p className="text-4xl font-bold">P2</p>
                    <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player2}</p>
                    </div>
                </div>
                <div className="m-5 border border-dashed border-black">
                    <p className="text-4xl font-bold">P3</p>
                    <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player3}</p>
                    </div>
                </div>
                <div className="m-5 border border-dashed border-black">
                    <p className="text-4xl font-bold">P4</p>
                    <div className="flex bg-red-500 h-20 w-44 justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player4}</p>
                    </div>
                </div>

                <div className="ml-auto mr-5 border border-dashed border-black">
                    <p className="text-4xl font-bold">Player</p>
                    <div className="bg-red-500 h-20 w-44"></div>
                </div>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/*
            <img src="http://192.168.178.23:5000/video" alt="video"/>
            <Score_old/>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <Alert color="info">Alert!</Alert>
            */}
        </main>
  )
}
